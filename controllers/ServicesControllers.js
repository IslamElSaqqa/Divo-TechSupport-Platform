// Import the Mongoose model
const ServiceShop = require('../models/servicesModel'); 

// Create a new service shop
// Admin Access only
const createServiceShop = async (req, res) => {
  try {
    // Check if req.user exists and has user_presence = 1
    if (!req.user || req.user.user_presence !== 1) {
      return res.status(403).json({
          error: "Unauthorized: Only Admin can delete Windows Errors."
    });
}
    const serviceShop = await ServiceShop.create(req.body)

      res.status(201).json({
          success: true, 
          message: 'Service shop created successfully', 
          data: serviceShop 
      });
    
    } catch (error) {
      res.status(400).json({ 
          success: false, 
          message: error.message 
      });
    }
};



const getServiceShops = async (req, res) => {
  const { area, gov } = req.query;

  try {
    
    const searchLocation = await ServiceShop.find({
      $or: [{ area: area }, {gov: gov}]
    })

    if (!searchLocation || searchLocation.length === 0) {
      throw Error("No service shops found for the provided filters.");
    }

    res.status(200).json({
      success: true,
      data: searchLocation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};


// Get all service shops
const getAllServiceShops = async (req, res) => {
  try {
    const serviceShops = await ServiceShop.find();
    
      res.status(200).json({
          success: true, 
          data: serviceShops 
          });
    } catch (error) {
      res.status(500).json({ 
          success: false, 
          message: 'Server error from /',
          error: error.message });
    }
};

const getShopsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { area: { $regex: search, $options: "i" } },
        { gov: { $regex: search, $options: "i" } }
      ]
    };

    const totalShops = await ServiceShop.countDocuments(query);
    const shops = await ServiceShop.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sort });

    res.status(200).json({
      status: "success",
      currentPage: page,
      totalPages: Math.ceil(totalShops / limit),
      totalShops,
      shops
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get a single service shop by ID
const getServiceShopById = async (req, res) => {
  try {
      const serviceShop = await ServiceShop.findById(req.params.id);
      
    if (!serviceShop) {
        return res.status(404).json({
          success: false,
            message: 'Service shop not found' 
          });
    }
    
      res.status(200).json({ 
          success: true, 
        data: serviceShop
      });
    
    } catch (error) {
      res.status(500).json({
          success: false,
            message: 'Server error', 
            error: error.message });
    }
};

// Update a service shop
// Admin Access only
const updateServiceShop = async (req, res) => {
  try {
      // Check if req.user exists and has user_presence = 1
      if (!req.user || req.user.user_presence !== 1) {
        return res.status(403).json({
            error: "Unauthorized: Only Admin can delete service shops."
      });
    }
      const serviceShop = await ServiceShop.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
        runValidators: true 
      });
      
      if (!serviceShop) {
        return res.status(404).json({
          success: false,
            message: 'Service shop not found' });
      }
      
      res.status(200).json({
          success: true, 
          message: 'Service shop updated successfully',
            data: serviceShop });
    } catch (error) {
      res.status(400).json({ success: false,
          message: error.message 
          });
    }
};

// Delete a service shop
// Admin Access only
const deleteServiceShop = async (req, res) => {
  try {
    // Check if req.user exists and has user_presence = 1
      if (!req.user || req.user.user_presence !== 1) {
          return res.status(403).json({
            error: "Unauthorized: Only Admin can delete Windows Errors."
        });
      }
      const serviceShop = await ServiceShop.findByIdAndDelete(req.params.id);
      
      if (!serviceShop) {
        return res.status(404).json({ 
          success: false,
          message: 'Service shop not found' });
      }
      
      res.status(200).json({
          success: true,
            message: 'Service shop deleted successfully' });
    } catch (error) {
      res.status(500).json({
          success: false,
            message: 'Server error', 
            error: error.message });
    }
};
module.exports = {
  deleteServiceShop,
  updateServiceShop,
  createServiceShop,
  getAllServiceShops,
  getServiceShopById,
  getServiceShops,
  getShopsPaginated
}
