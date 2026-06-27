const express = require("express")
const router = express.Router()
const {
    deleteServiceShop,
    updateServiceShop,
    createServiceShop,
    getAllServiceShops,
    getServiceShopById,
    getServiceShops,
    getShopsPaginated
} = require('../controllers/ServicesControllers')

// protecting API routes
const {requireAuth, requireAdmin } = require('../middleware/requireAuth')

// Get All ServiceShops
// @route  GET /api/serviceShops/shops
router.get("/shops", getAllServiceShops)

// @route GET /api/serviceShops/shops
router.get("/", getServiceShops)

// @route GET /api/serviceShops/getShopsPaginated
router.get("/getShopsPaginated", requireAuth, requireAdmin, getShopsPaginated)


// Get a single ServiceShop by ID
// @route Endpoint GET /api/serviceShops/:id
router.get("/:id", getServiceShopById)

// / Update ServiceShop
// @route Endpoint  Patch /api/serviceShops/:id
// Access Private (Admin only)
router.patch("/:id", requireAuth, requireAdmin, updateServiceShop)

// Delete a ServiceShop
// @route Endpoint  DELETE /api/serviceShops/:id
// @access Private (Admin only)
router.delete("/:id", requireAuth, requireAdmin, deleteServiceShop)

// Add a new ServiceShop
// @route  POST /api/serviceShops
// Admin Access only
router.post("/", requireAuth, requireAdmin, createServiceShop)

module.exports = router