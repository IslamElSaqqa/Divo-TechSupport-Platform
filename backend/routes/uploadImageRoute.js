const express = require('express')
const router = express.Router()
const { uploadImage } = require("../middleware/multer")
const uploadImagestoCloud   = require('../controllers/uploadImages')
router.post('/toCloudinary', uploadImage.single("image"), uploadImagestoCloud)
module.exports = router