const mongoose = require("mongoose");
const { format } = require('date-fns');
const instaRefIdRegex = /^51\d{10}$/;
const helpSessionSchema = new mongoose.Schema(
    {
        user: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            username: {
                type: String,
                required: true
            },
            phone_number: {
                type: String,
                required: true
            }
        },
        specialist: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Specialist",
                
            },
            specialist_name: { type: String},
            specialization: { type: String },
            email: { type: String },
            phone: { type: String }
        },
        end_time: { type:  Date},
        duration: { type: Number },
        status: {
            type: String,
            enum: ["pending", "accepted", "completed", "rejected"],
            default: "pending"
        },

        instapay_reference: {
            type: Number,
            required: true,
            unique: [true, "Instapay_reference id must be unique to request session"],
            validator: {
                function(v) {
                    return instaRefIdRegex.test(v)
                },
                message: "Invalid Invalid reference ID! "
            }
            },
        note: { type: String, default: "" },
        description: {
            type: String,
            required: [true,"Description is required!"]
        },
        image_url: {
            type: String,
            required: [true, "Image is required!"]
        },
        steps: {
            type: String,
            required: [true, "issues steps are required!"]
        },
        type: { 
            type: String,
            default: ''
        },
        dayOfTheWeek: {
            type: Number,
            default: () => new Date().getDay()
        }
    },{ timestamps: true });
module.exports = mongoose.model("HelpSession", helpSessionSchema);