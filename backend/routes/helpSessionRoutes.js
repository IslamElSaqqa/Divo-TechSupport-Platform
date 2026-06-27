const express = require("express");
const router = express.Router();
const {
    createHelpSession,
    getAllHelpSessions,
    getHelpSessionById,
    updateHelpSessionStatus,
    deleteHelpSession,
    getRequestsPaginated,
    getEveryHelpSessions,
    getHelpSessionsByPeriod,
    updateHelpSessionStatusBySpecialist,
    getHelpSessionsByTechnician,
    updateHelpSessionWithTechnician,
    updateHelpSessionType,
    addNoteToHelpSession
} = require("../controllers/helpSessionController");

// protecting API routes
const { requireAuth, requireAdminOrSpecialist } = require("../middleware/requireAuth");
const combinedAuth = require("../middleware/combinedAuth");

// Get sessions filtered by technician
router.get("/technician/sessions", combinedAuth, requireAdminOrSpecialist, getHelpSessionsByTechnician);

// Update session status and assign technician
router.patch("/technician/:id/status", combinedAuth, requireAdminOrSpecialist, updateHelpSessionWithTechnician);

// Update session type (only by assigned technician)
router.patch("/technician/:id/type", combinedAuth, requireAdminOrSpecialist, updateHelpSessionType);

// Add note to session (only by assigned technician)
router.patch("/technician/:id/note", combinedAuth, requireAdminOrSpecialist, addNoteToHelpSession);

router.get("/getRequestsPerioded", getHelpSessionsByPeriod, combinedAuth, requireAdminOrSpecialist)
router.get("/getRequestsPaginated", getRequestsPaginated, combinedAuth, requireAdminOrSpecialist);
router.get("/getRequestsDashboard", getEveryHelpSessions, combinedAuth, requireAdminOrSpecialist);

// Public Routes(only by Authenticated users)
router.post("/", requireAuth, createHelpSession);
router.get("/:id",combinedAuth, requireAdminOrSpecialist, getHelpSessionById);

// Admin Or Specialist Routes
router.get("/", combinedAuth, requireAdminOrSpecialist, getAllHelpSessions);
router.patch("/:id", combinedAuth, requireAdminOrSpecialist, updateHelpSessionStatus);
router.patch("/:id", combinedAuth,requireAdminOrSpecialist ,updateHelpSessionStatusBySpecialist);
router.delete("/:id", combinedAuth, requireAdminOrSpecialist, deleteHelpSession);


module.exports = router;
