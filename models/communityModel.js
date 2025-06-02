const mongoose = require('mongoose')

const communityPostSchema = new mongoose.Schema({
    user: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    image_url: {
        type: String,
    },
    comments:[
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: { type: String, required: true },
            content: { type: String, required: true },
            created_at: { type: Date, default: Date.now },
        },
        
    ],

}, { timestamps: true }
)

module.exports = mongoose.model("CommunityPost", communityPostSchema)