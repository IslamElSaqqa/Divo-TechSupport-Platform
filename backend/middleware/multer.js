const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Common storage function with custom folder
const createStorage = (subfolder) => multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = `uploads/${subfolder}`;
        ensureDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

// File filters
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (JPG, JPEG, PNG, GIF, WEBP) are allowed!"));
    }
};

const videoFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mkv|webm|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /video/.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only video files (MP4, MKV, WEBM, AVI) are allowed!"));
    }
};

// Upload handlers
const uploadImage = multer({
    storage: createStorage("images"),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFilter,
});

const uploadVideo = multer({
    storage: createStorage("videos"),
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: videoFilter,
});

module.exports = {
    uploadImage,
    uploadVideo
};
