const express = require("express")
const router = express.Router()
// importing controllers
const { forgotPassword, verifyOTP,resetPassword } = require('../controllers/forgotResetPassController')

// Building API routes

// forgotPassword API route
// method=POST /api/auth/forgot-password 
router.post('/forgot-password', forgotPassword)

// method= POST /api/auth/verify-otp
router.post("/verify-otp", verifyOTP);

// resetPassword API route
// method= POST /api/auth/forgot-password
router.post('/reset-password', resetPassword)

module.exports = router