const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Specialist = require('../models/specialistModel');

const combinedAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        // Try finding a User first
        const user = await User.findById(decoded._id).select('_id user_presence');
        if (user) {
            req.user = user;
            return next();
        }

        // Try finding a Specialist
        const specialist = await Specialist.findById(decoded._id).select('_id name');
        if (specialist) {
            req.specialist = specialist;
            return next();
        }

        // If neither found
        return res.status(401).json({ error: 'Unauthorized: User or Specialist not found' });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
module.exports = combinedAuth