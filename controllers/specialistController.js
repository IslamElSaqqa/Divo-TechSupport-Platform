const Specialist = require('../models/specialistModel')
const jwt = require('jsonwebtoken')

// Creating the token
const createToken = (_id) => {
    return jwt.sign({_id }, process.env.SECRET,{expiresIn: '5d'})

};
// Get All Specialists
// @route  GET /api/specialists
const getSpecialists = async (req, res) => {
    try {
        const specialists = await Specialist.find({});

        res.status(200).json({
            success: true,
            data: specialists
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// @route GET /api/users
// @desc  Get all users with pagination, filtering, and sorting
const getAllSpecialists = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const sort = req.query.sort === "desc" ? -1 : 1;
        const skip = (page - 1) * limit;

        const query = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone_number: { $regex: search, $options: "i" } }
            ]
            }
        : {}; // ✅ fallback to return all

        const totalSpecialist = await Specialist.countDocuments(query);
        const specialists = await Specialist.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sort });

        res.status(200).json({
        status: "success",
        currentPage: page,
        totalPages: Math.ceil(totalSpecialist / limit),
        totalSpecialist,
        specialists
        });
    } catch (error) {
        console.error("Error fetching specialists:", error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};


// Get a single Specialist by ID
// @route Endpoint GET /api/specialists/:id
const getSpecialistById = async (req, res) => {
    try {
        const specialist = await Specialist.findById(req.params.id);
        
        if (!specialist) {
            return res.status(404).json({ error: "Specialist not found" });
        }
    
        res.status(200).json({
            success: true,
            data: specialist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Specialist profile, Access Private (Specialist only)
// @route Endpoint  Patch /api/specialists/:id
const updateSpecialist = async (req, res) => {
    try {
        const specialist = await Specialist.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!specialist) {
            return res.status(404).json({ error: "Specialist not found" });
        }

        res.status(201).json({
            message: "Specialist updated successfully",
            data: specialist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a Specialist
// @route Endpoint  DELETE /api/specialists/:id
// @access Private (Admin only)
const deleteSpecialist = async (req, res) => {
    try {
        // Check if req.user exists and has user_presence = 1
        if (!req.user || req.user.user_presence !== 1) {
            return res.status(403).json({ error: "Unauthorized: Only admins can delete specialists." });
        }

        const specialistId = req.params.id;

        // Check if the specialist exists
        const specialist = await Specialist.findById(specialistId);
        if (!specialist) {
            return res.status(404).json({ error: "Specialist not found" });
        }

        // Delete the specialist
        await Specialist.findByIdAndDelete(specialistId);

        res.status(200).json({ message: "Specialist deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: error.message });
    }
};


// Register a new Specialist => @access Public
// @route  POST /api/specialists/register
const signupSpecialist = async (req, res) => {

    const { name, email, password, phone_number, specialization } = req.body;

    try {
        const specialist = await Specialist.registerSpecialist(name, email, password, phone_number, specialization);
        
        // adding the token
        const token = createToken(specialist._id)
        res.status(201).json({
            token,
            _id: specialist._id,
            name: specialist.name,
            email: specialist.email,
            phone_number: specialist.phone_number,
            specialization: specialist.specialization,
            rating: specialist.rating,
            active_sessions: specialist.active_sessions,
            requests: specialist.requests,
            createdAt: specialist.createdAt,
            updatedAt: specialist.updatedAt,
        })
    } catch (error) { 
        res.status(400).json({message: error.message})
    }
}


// @route  POST /api/specialists/login
const loginSpecialist = async (req, res) => {
        
    const { email, password } = req.body;
    try {
        const specialist = await Specialist.login(email, password);
        const specialistId = specialist._id
        const specialistName = specialist.name
    
        // create the token 
        const token = createToken(specialist._id)

        res.status(201).json({message: "Login successful", email, token, specialistName, specialistId});
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    deleteSpecialist,
    updateSpecialist,
    getSpecialistById,
    getSpecialists,
    signupSpecialist,
    loginSpecialist,
    getAllSpecialists
}