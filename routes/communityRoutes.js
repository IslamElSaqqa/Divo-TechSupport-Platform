// express, router , APIs
const express = require('express')

// Define routes
const router = express.Router()
const { uploadImage } = require("../middleware/multer");

// Extracting Modules
const {
    getAllPosts,
    getPost,
    createPost,
    uploadPostImage,
    likePost,
    unlikePost,
    addComment,
    getPostComments,
    sharePost,
    deletePost,
    updatePost,
    updateComment,
    deleteComment 
} = require('../controllers/communityController')

const { requireAuth } = require('../middleware/requireAuth')

//Get all posts using pagination
// @route Method= GET , Endpoint /api/community/posts?page=1&limit=5
// This is for logged in users
router.get('/', getAllPosts)

//Get a post
// route Method= GET, Endpoint /api/community/posts/:id
// public access
router.get('/:id', getPost)

// Create new post
// Access => Logged in users only
router.post('/', requireAuth ,createPost)

// upload an image
// @route POST /api/community/posts/upload
// Access => Logged in users only
// note that we used upload multer as a middleware between request and response
router.post("/upload", requireAuth, uploadImage.single("image"), uploadPostImage);

// Like a post
// Access => Logged in users only
router.patch('/:id/like', requireAuth,likePost)

// unLike a post
// Access => Logged in users only
router.patch('/:id/unlike', requireAuth,unlikePost)

// Add a comment to a post
// Access => Logged in users only
router.post('/:id/addcomments', requireAuth,addComment)

// Get comments for a post
// Public Access
router.get('/:id/comments',  getPostComments)

// Share a post
// Access => Logged in users only
router.post('/:id/share', requireAuth, sharePost)

// delete a post  @route /api/community/posts/:id
// Access => Logged in users only => token and post_id
router.delete('/:id', requireAuth, deletePost)

// Update a post
// Access => Logged in users only
router.patch('/:id', requireAuth, updatePost)

// comment routes
router.put('/:postId/comments/:commentId', requireAuth, updateComment);
router.delete('/:postId/comments/:commentId', requireAuth, deleteComment);

// export all routes
module.exports = router 