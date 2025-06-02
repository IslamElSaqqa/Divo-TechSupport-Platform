const cloudinary = require("../Cloudinary/cloudinary");

const uploadImagestoCloud = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "Sessions_uploads", // Optional: Organize uploads in a folder
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
module.exports =  uploadImagestoCloud 