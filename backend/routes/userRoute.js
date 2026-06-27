const express = require("express")
const router = express.Router()
const { uploadImage } = require("../middleware/multer");

const {
    getUserPosts,
    getUser,
    updateProfile,
    getUsers,
    deleteUser,
    loginUser,
    SignupUser,
    adminUpdateProfile,
    uploadProfileImage,
    updateProfileImage,
} = require("../controllers/userController")
// protecting API routes
const { requireAuth, requireAdmin } = require('../middleware/requireAuth')


// Get users 
// @route GET /api/users
router.get("/", requireAuth, requireAdmin, getUsers)

// Get user by id 
// @route GET /api/users/:id
router.get("/:id", requireAuth, getUser)

// Update user 
//@route PATCH /api/users/:id
router.patch("/:id", updateProfile)

// Update user by admin
router.patch("/adminUpdate/:id", adminUpdateProfile)

// updateUserProfile //@route PATCH /api/users/profile/:id

// Delete user =>(Admin Access only)
//@route PATCH /api/users/:id
router.delete("/:id", requireAuth, requireAdmin, deleteUser)

// Get posts by a specific user
// @route Endpoint /api/users/:id/posts
router.get("/:id/posts", requireAuth, getUserPosts)

// Login user
// #route POST /api/users/login
router.post("/login", loginUser)

// Register user
// #route POST /api/users/register
router.post("/register", SignupUser) 


// upload profile image
router.post("/upload/profile-image", requireAuth, uploadImage.single("profile-image"), uploadProfileImage);

router.patch("/profile-image/:id", requireAuth, updateProfileImage)

module.exports = router