const WindowsError = require('../models/windowsErrorModel');
// Create a new Windows error
// @route POST /api/WindowsError
const createWindowsError = async (req, res) => {
  try {
    const newError = await WindowsError.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Windows error created successfully',
      data: newError
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: err.message
    });
  }
};

// Get all Windows errors
// @route GET /api/WindowsError
// Get ALL Windows errors
// try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = req.query.search || "";
//     const sort = req.query.sort === "desc" ? -1 : 1;

//     const skip = (page - 1) * limit;

//     const query = {
//       $or: [
//         { name: { $regex: search, $options: "i" } },
//         { area: { $regex: search, $options: "i" } },
//         { gov: { $regex: search, $options: "i" } }
//       ]
//     };

//     const totalShops = await ServiceShop.countDocuments(query);
//     const shops = await ServiceShop.find(query)
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: sort });

//     res.status(200).json({
//       status: "success",
//       currentPage: page,
//       totalPages: Math.ceil(totalShops / limit),
//       totalShops,
//       shops
//     });
//   } catch (error) {
//     console.error("Error fetching shops:", error);
//     res.status(500).json({ status: "error", message: "Server error" });
//   }




const getAllWindowsErrors = async (req, res) => {
  try {
const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;
    const query = {
      $or: [
        { error_code: { $regex: search, $options: "i" } },
      ]
    };


    const totalErrors = await WindowsError.countDocuments(query);
const errors = await WindowsError.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ error_code: sort });

res.status(200).json({
  success: true,
  count: errors.length,
  error: errors,
  totalPages: Math.ceil(totalErrors / limit)
});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving all Windows errors',
      error: err.message
    });
  }
};



// Get all Windows errors
// @route GET /api/WindowsError
const getWindowsErrorByCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      throw Error("Error Code is required")
        }

    const error = await WindowsError.findOne({ error_code: code });

    if (!error) {
      throw Error("No error code found")
    }

    res.status(200).json({
      success: true,
      count: 1,
      error
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Windows errors',
      error: err.message
    });
  }
};


// Get a single Windows error by ID
// @route GET /api/WindowsError/:id
const getWindowsError = async (req, res) => {
  try {
    const error = await WindowsError.findById(req.params.id);

    if (!error) {
      return res.status(404).json({
        success: false,
        message: 'Windows error not found'
      });
    }
    res.status(200).json({
      success: true,
      data: error
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving Windows error',
      error: err.message
    });
  }
};

//  Update a Windows error by ID
// @route PATCH /api/WindowsError/:id 
// Admin Access only
const updateWindowsError = async (req, res) => {
  try {
        // Check if req.user exists and has user_presence = 1
        if (!req.user || req.user.user_presence !== 1) {
            return res.status(403).json({
                error: "Unauthorized: Only Admin can update Windows Error logs."
          });
        }
      const updatedError = await WindowsError.findByIdAndUpdate(
        req.params.id,
        { ...req.body, last_updated: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedError) {
        return res.status(404).json({
          success: false,
          message: 'Windows error not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Windows error updated successfully',
        data: updatedError
      });
    } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating Windows error',
      error: err.message
    });
  }
};

//  Delete a Windows error by ID
// @route DELETE /api/WindowsError/:id
// Admin access only
const deleteWindowsError = async (req, res) => {
  try {
    // Check if req.user exists and has user_presence = 1
      if (!req.user || req.user.user_presence !== 1) {
          return res.status(403).json({
              error: "Unauthorized: Only Admin can delete Windows Errors."
        });
    }
      const deletedError = await WindowsError.findByIdAndDelete(req.params.id);

      if (!deletedError) {
        return res.status(404).json({
          success: false,
          message: 'Windows error not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Windows error deleted successfully'
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting Windows error',
      error: err.message
    });
  }
};

module.exports = {
  updateWindowsError,
  getWindowsErrorByCode,
  getWindowsError,
  deleteWindowsError,
  createWindowsError,
  getAllWindowsErrors

}
