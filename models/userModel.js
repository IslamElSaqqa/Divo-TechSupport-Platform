const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')


const usernameRegex = /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{1,28}[a-zA-Z0-9]$/;
const phoneRegex = /^(010|011|012|015)\d{8}$/; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"],
        validate: {
            validator: function (v) {
                return usernameRegex.test(v);
            },
            message: "Invalid username format. Only letters, numbers, underscores (_), and periods (.) are allowed. No consecutive _ or ., and must start & end with a letter/number."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password_hash: {
        type: String,
        required: true,
        select: false
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
  created_at: { type: Date, default: Date.now },

    last_login: Date,
    user_presence: {
        type: Number,
        enum: [0, 1],
        required: true,
        default: 0
            },
    viewed_errors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WindowsError"
        }
    ],
    service_ratings: [
        {
            shop_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ServiceShop"
            },
        rating: Number
        },
    ],
})

// Register User
userSchema.statics.registerUser= async function (username, email, password_hash, phone_number, user_presence){
    // Doing multiple checks
    if (!username || !email || !password_hash || !phone_number) {
        throw Error('All fields must be filled!')
    }

    if (!validator.matches(username, usernameRegex)) { 
        throw Error('Invalid username')
    }

    if (!validator.isEmail(email)) { 
        throw Error('Invalid Email!')
    }

    if (!validator.isStrongPassword(password_hash)) { 
        throw Error('Password is not strong enough!')
    }
     // Egyptian Regex phone number
    if (!validator.matches(phone_number, phoneRegex)) { 
        throw Error('Invalid phone_number')
    }

    // const existingUser = await this.findOne({ $or: [{ email }, { username }, {phone_number}] });
    const existingEmail = await this.findOne({ email })
    if (existingEmail) { 
        throw Error('Email is already in use!')
    }   
    const existingPhone = await this.findOne({ phone_number })
    if (existingPhone) { 
        throw Error('Phone is already in use!')
    }   
    
    const existingUsername = await this.findOne({ username })
    if (existingUsername) {
        throw Error('username is already in use!')
    }
    // Hash password
    // salt default = 10 rounds
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password_hash, salt);
    
            // Create user
            const user = await this.create({
                username,
                email,
                password_hash: hashedPassword,
                phone_number,
                user_presence
            });
    return user
}
userSchema.statics.login = async function (identifier, password) {
    // Doing multiple checks
    if (!identifier || !password) { 
        throw Error('All Fields must be filled')
    }

    // Find specialist by email Or phone number
    const user = await this.findOne({
        $or: [{ email: identifier }, { phone_number: identifier }, {username: identifier}]
    }).select('+password_hash');

    if (!user) {
        throw new Error("Invalid email/phone");
    }

    // Compare password
    const matchPassword = await bcrypt.compare(password, user.password_hash);
    if (!matchPassword) {
        throw new Error("Invalid password");
    }
    return user
}

// Exporting user model
module.exports = mongoose.model("User", userSchema)
