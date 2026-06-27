const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => { 

    // Verify Authentication
    const { authorization } = req.headers

    // Check if Authorization exists
    if (!authorization) { 
        return res.status(401).json({error: 'Authorization token required'})
    }
    console.log("Authorization Header:", authorization); // Debugging

    // Get the token and split => 'Bearer skldvlksjd.1ekjdkjsvh.slkjskld'
    const token = authorization.split(' ')[1]

    try { 
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findById(_id).select('_id user_presence')
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized!'})
    }
}

// Admin Authentication Middleware (For Admins Only)
const requireAdmin = (req, res, next) => {
    // Check if the user is authenticated and has user_presence === 1
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    if (req.user.user_presence !== 1) {
        return res.status(403).json({
            error: "Forbidden: Only admins can perform this action"
        });
    }
    next(); // Allow request to continue
};

const requireAdminOrSpecialist = (req, res, next) => {
    if (
        (req.user && req.user.user_presence === 1) || // Admin
        req.specialist                                 // Specialist
    ) {
        return next();
    }

    return res.status(403).json({ error: "Access denied. Admin or Specialist required." });
};

// Export Authentication middlewares
module.exports = { requireAuth, requireAdmin, requireAdminOrSpecialist }