const nodemailer = require("nodemailer");
const validator = require("validator")
const phoneRegex = /^(010|011|012|015)\d{8}$/; 

const contactUs = async (req, res) => {
    // Grab email, name, phone, message from request
    const { email, name, phone, message } = req.body;

    try {
        // check for empty name
        if(!name) throw Error("Name is required to contact us!")

        // Check if email is empty
        if (!email || email.trim() === '') {
            throw Error("Email is required!");
        }

        // Check on email format
        if (!validator.isEmail(email)) { 
            throw Error("Invalid Email!")
        };

        if (!phone) throw Error("phone number is required!")
        
         // Egyptian Regex phone number
        if (!validator.matches(phone, phoneRegex)) { 
            throw Error('Invalid phone number!')
        }

        if(!message) throw Error("please enter your contact message so that we can help!")

        // Email setup
        let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FIRE_EMAIL_USER,
            pass: process.env.FIRE_EMAIL_PASS,
        },
        });

        await transporter.sendMail({
            to: process.env.FIRE_EMAIL_USER,
            from: email,
            subject: "Contact Us",
            text: `${message}`,
        });

        res.json({
            message: "Contact Details sent successfully",
            data: {
                email, phone, message, name
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
module.exports = contactUs