const express = require("express")
const router = express.Router()
const  {
    updateWindowsError,
    getWindowsErrorByCode,
    getWindowsError,
    deleteWindowsError,
    createWindowsError,
    getAllWindowsErrors
} = require('../controllers/windowsErrorController')

// Protecting API Routes
const { requireAuth, requireAdmin } = require('../middleware/requireAuth')
router.get("/", getAllWindowsErrors);  // ✅ all errors
router.get("/search", getWindowsErrorByCode); // ✅ search by code

// // Get All Windows Errors
// // @route Endpoint GET /api/WindowsErrors
// router.get("/", getWindowsErrorByCode)

// Get a single WindowsError by ID
// @route Endpoint GET /api/WindowsError/:id
router.get("/:id", getWindowsError)

// / Update WindowsError
// @route Endpoint  Patch /api/WindowsError/:id
// Access Private (Admin only)
router.patch("/:id", requireAuth, requireAdmin, updateWindowsError)

// Delete a WindowsError
// @route Endpoint  DELETE /api/WindowsError/:id
// @access Private (Admin only)
router.delete("/:id",  requireAuth, requireAdmin, deleteWindowsError)

// Create a new windows Error
// @route  POST /api/WindowsError
// @access Public
router.post("/", createWindowsError)


// Export all errors (admin only)
router.get("/export/all", requireAuth, requireAdmin, async (req, res) => {
  try {
    const all = await require('../models/windowsErrorModel').find({});
    res.status(200).json({ errors: all });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Failed to export errors" });
  }
});


module.exports = router