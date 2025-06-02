const express = require("express")
const router = express.Router()

// importing controller
const contactUs = require('../controllers/contactUsMailer')

// Building API routes

router.post('/', contactUs)

module.exports = router