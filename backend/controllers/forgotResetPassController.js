const db = require("../utils/firebase");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const validator = require("validator")
const jwt = require('jsonwebtoken')

// forgotPassword controller
const forgotPassword = async (req, res) => {
    // Grab email from request
    const { email } = req.body;

    try {
         // Check if email is empty
        if (!email || email.trim() === '') {
            throw Error("Email is required!");
        }

        // Check on email format
        if (!validator.isEmail(email)) { 
            throw Error("Invalid Email!")
        }

        // Find the user using email
        const user = await User.findOne({ email });

        // check that user exists
        if (!user) {
            // return res.status(404).json({ message: "User not found" })
            throw Error('Email is not found!')
        };

        // Generate OTP calculation & expiration date
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins

        // append otp to firestore as a document
        await db.collection("otp_verification").doc(email).set({
            otp,
            expiresAt,
        });

        // Email setup
        let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FIRE_EMAIL_USER,
            pass: process.env.FIRE_EMAIL_PASS,
        },
        });

        await transporter.sendMail({
        from: `"Divo Support" <${process.env.FIRE_EMAIL_USER}>`,
        to: email,
        subject: "DIVO Password Reset OTP",
        text: `Below is your one time passcode that you need to use to complete your authentication. The verification code will be valid for 10 minutes. Please do not share this code with anyone.\n ${otp}.\nIf you are having any issues with your account, please don't hesitate to contact us.`,
        });

        res.json({ message: "OTP sent to email", email,otp});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
// OTP Verification:     
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    
    try {
        const docRef = db.collection("otp_verification").doc(email);
        const doc = await docRef.get();

        if (!doc.exists || doc.data().otp !== otp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const { expiresAt } = doc.data();
        if (Date.now() > expiresAt) {
        return res.status(400).json({ message: "OTP expired" });
        }

        // OTP is valid - generate a JWT token
        const resetToken = jwt.sign({ email },process.env.RESET_PASSWORD_SECRET,
        { expiresIn: '10m' } );
    
        res.status(200).json({ message: "OTP verified", token: resetToken });
    } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
// resetPassword controller
const resetPassword = async (req, res) => {
    // Grab token & newPassword from user request
    const { token, newPassword, confirmPassword } = req.body;
    try {
        // check empty password
        if (!newPassword) throw Error("New Password is required!")
        if(!confirmPassword) throw Error("Please confirm your password!")
        if (newPassword !== confirmPassword)
            throw Error("Passwords do not match!")
        // check that token exists!
        if (!token) throw Error("Not authorized to change your password");
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        const email = decoded.email;

        if (!newPassword) { 
            throw Error('Password is required')
        }

        if (!validator.isStrongPassword(newPassword)) { 
                throw Error('Password is not strong enough!')
        }

        // hashing the new password using bcrypt + salt with 10 rounds generation
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update user model with the new password
        await User.updateOne({email},{ password_hash: hashedPassword });
    
        // delete the otp from firebase collection
        await db.collection("otp_verification").doc(email).delete();
        res.status(200).json({ message: "Password reset successfully" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
module.exports = {forgotPassword, verifyOTP,resetPassword}