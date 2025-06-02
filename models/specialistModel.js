const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require('../models/userModel')
// Specialist Schema
const specialistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone_number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{11}$/.test(v); // Allows only 11-digit numbers
            },
            message: props => `Phone number must be 11 digits long.`
        },
        required: true
    },
    specialization: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    active_sessions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "HelpSession",
        default: []
    },
    requests: { type: [String], default: [] },
    image_url: { type: String }
},{ timestamps: true }
);

// Register Specialist
specialistSchema.statics.registerSpecialist = async function (name, email, password, phone_number, specialization) {        
    // Doing multiple checks
    if (!name || !email || !password || !phone_number || !specialization) { 
        throw Error('All Fields must be filled')
    }

    if (!validator.isEmail(email)) { 
        throw Error('Invalid Email Address!')
    }

    // Egyptian Regex phone number
    const regex = /^(010|011|012|015)\d{8}$/;
    if (!validator.matches(phone_number, regex)) { 
        throw Error('Invalid phone_number')
    }

    const trimmedSpecialization = validator.trim(specialization)
    if (!validator.isEmpty(trimmedSpecialization) && !validator.matches(trimmedSpecialization, /^[^0-9]+$/)) { 
        throw Error('Specialization must be a text')
    }

    if (!validator.isStrongPassword(password)) { 
        throw Error('Password is not strong Enough!')
    }
        // Check if the email is already in use
        const existingSpecialist = await this.findOne({ email });

        if (existingSpecialist) {
            throw Error('Email is already in use!')
    }
        // Hash password
        // salt default = 10 rounds
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create specialist
        const specialist = await this.create({
            name,
            email,
            password: hashedPassword,
            phone_number,
            specialization,
        });

    return specialist;
    } 

//  Login Specialist =>  @access Public
// @route  POST /api/specialists/login
specialistSchema.statics.login = async function (email, password) {
    // Doing multiple checks
    if (!email || !password) { 
        throw Error('All Fields must be filled')
    }

    // Find specialist by email
    const specialist = await this.findOne({email});

    if (!specialist) {
        throw new Error("Invalid email");
    }

    // Compare password
    const matchPassword = await bcrypt.compare(password, specialist.password);
    if (!matchPassword) {
        throw new Error("Invalid password");
    }
    return specialist
}
module.exports = mongoose.model("Specialist", specialistSchema);
