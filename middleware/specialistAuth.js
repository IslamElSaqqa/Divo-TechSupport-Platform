const jwt = require('jsonwebtoken')
const Specialist = require('../models/specialistModel')

const SpecialistAuth = async (req, res, next) => { 
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
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = await Specialist.findById(decoded._id).select('_id')
        if (!req.user) {
            return res.status(401).json({ error: 'Specialist not found' });
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized!'})
    }
}
module.exports = SpecialistAuth