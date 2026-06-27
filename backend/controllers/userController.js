const CommunityPost = require("../models/communityModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cloudinary = require("../Cloudinary/cloudinary");


// Create token
const createToken = ({ _id, user_presence }) => {
  return jwt.sign({ _id, user_presence }, process.env.SECRET, {
    expiresIn: "5d",
  });
};

// @route GET /api/users
// @desc  Get all users with pagination, filtering, and sorting
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort === "desc" ? -1 : 1;
    const presence = req.query.presence;

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } }
      ]
    };

    if (presence === '0' || presence === '1') {
      query.user_presence = parseInt(presence);
    }

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: sort });

    res.status(200).json({
      status: "success",
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get user details by id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("viewed_errors service_ratings.shop_id");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, email, phone_number, currentPassword, newPassword, confirmPassword} = req.body;

  try {
    const user = await User.findById(userId).select("+password_hash");
    if (!user) throw new Error("User not found");

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (phone_number) updateFields.phone_number = phone_number;

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) throw Error("All password fields required");
      if (newPassword !== confirmPassword) throw Error("Passwords do not match");
      if (!validator.isStrongPassword(newPassword)) throw Error("Weak password");
      const match = await bcrypt.compare(currentPassword, user.password_hash);
      if (!match) throw Error("Incorrect current password");
      updateFields.password_hash = await bcrypt.hash(newPassword, 10);
    }

    await User.updateOne({ _id: userId }, { $set: updateFields });
    const updatedUser = await User.findById(userId).select("-password_hash");
    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const adminUpdateProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, email, phone_number, user_presence} = req.body;

  try {

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (phone_number) updateFields.phone_number = phone_number;
    if (user_presence === 0 || user_presence === 1) updateFields.user_presence = Number(user_presence);

    console.log(updateFields);

    await User.updateOne({ _id: userId }, { $set: updateFields });
    const updatedUser = await User.findById(userId);
    res.status(200).json({ message: "Profile updated deez", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.user_presence !== 1) {
      return res.status(403).json({ error: "Only Admin can delete users." });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register user
const SignupUser = async (req, res) => {
  const { username, email, password_hash, phone_number, user_presence } = req.body;
  try {
    const user = await User.registerUser(username, email, password_hash, phone_number, user_presence);
    const token = createToken(user);
    res.status(200).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        email,
        username,
        token,
        user_presence,
        phone_number,
        profile_image: user.profile_image,
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.login(identifier, password);
    const token = createToken(user);
    res.status(201).json({
      message: "Login successful",
      identifier,
      userId: user._id,
      token,
      username: user.username,
      user_presence: user.user_presence,
      phone_number: user.phone_number,
      profile_image: user.profile_image
    });
    user.last_login = new Date();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user posts
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await CommunityPost.find({ "user._id": userId })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CommunityPost.countDocuments({ "user._id": userId });

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: posts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching posts", error: error.message });
  }
};


const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "user_profile", 
                use_filename: true,
                unique_filename: false,
            }
        );

        res.status(200).json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        });
    }
};

// update profile image: 
const updateProfileImage = async (req, res) => {
  const userId = req.user._id;
  const { profile_image } = req.body;

  try {
    if (!profile_image) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profile_image = profile_image;
    await user.save();

    res.status(200).json({
      message: "Profile image updated",
      imageUrl: profile_image
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getUsers,
  getUser,
  updateProfile,
  deleteUser,
  loginUser,
  SignupUser,
  getUserPosts,
  adminUpdateProfile,
  uploadProfileImage,
  updateProfileImage
};