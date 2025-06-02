const express = require("express")
const router = express.Router()
const {
    deleteSpecialist,
    updateSpecialist,
    getSpecialistById,
    getSpecialists,
    signupSpecialist,
    loginSpecialist,
    getAllSpecialists
} = require('../controllers/specialistController')
const SpecialistAuth = require("../middleware/specialistAuth");
const { requireAdmin , requireAuth} = require('../middleware/requireAuth')
const { requireAdminOrSpecialist} = require('../middleware/requireAuth')
const combinedAuth = require('../middleware/combinedAuth')

// Get All Specialists
// @route  GET /api/specialists 
router.get("/",combinedAuth ,requireAdminOrSpecialist, getSpecialists)

// Get All Specialists with pagination
// @route  GET /api/specialists/getSpecialistsPaginated
router.get("/getSpecialistsPaginated", getAllSpecialists)

// Get a single Specialist by ID
// @route Endpoint GET /api/specialists/:id
router.get("/:id", SpecialistAuth,getSpecialistById)

// / Update Specialist profile
// @route Endpoint  Patch /api/specialists/:id
// Access Private (Specialist only)
router.patch("/:id", requireAuth, requireAdmin, updateSpecialist);



// Delete a Specialist
// @route Endpoint  DELETE /api/specialists/:id
// @access Private (Admin only)
router.delete("/:id", requireAuth, requireAdmin, deleteSpecialist)

// Register a new Specialist
// @route  POST /api/specialists/register
// @access Public
router.post("/register", signupSpecialist)


//  Login Specialist =>  @access Public
// @route  POST /api/specialists/login
router.post("/login", loginSpecialist)


// Get ALL specialists for export (no pagination)
// @route GET /api/specialists/export/all
router.get("/export/all", requireAuth, requireAdmin, async (req, res) => {
  try {
    const allSpecialists = await require('../models/specialistModel').find({});
    res.status(200).json({ specialists: allSpecialists });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Failed to export specialists" });
  }
});



module.exports = router