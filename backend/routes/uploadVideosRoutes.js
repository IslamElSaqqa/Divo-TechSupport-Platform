const express = require("express")
const router = express.Router()
const uploadVideos = require("../controllers/uploadVideos")
const { uploadVideo } = require("../middleware/multer");

router.post("/uploaded_Videos", uploadVideo.single("video"), uploadVideos)
module.exports = router


