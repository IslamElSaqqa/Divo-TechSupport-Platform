const cloudinary = require("../Cloudinary/cloudinary");
const uploadVideos = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "uploaded_Videos",
                use_filename: true,
                unique_filename: false,
                resource_type: "video"
            }
        );

        res.status(200).json({ success: true, url: result.secure_url });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading video",
            error: error.message
        });
    }
};
module.exports = uploadVideos
