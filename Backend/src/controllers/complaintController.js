const Complaint = require('../models/Complaint');

/**
 * @desc   Create a new complaint
 * @route  POST /api/complaints
 * @access Private (User)
 */
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Basic validation
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create complaint",
      error: error.message,
    });
  }
};

/**
 * @desc   Get logged-in user's complaints
 * @route  GET /api/complaints/me
 * @access Private (User)
 */
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
      error: error.message,
    });
  }
};

/**
 * @desc   Get all complaints (Admin / Officer)
 * @route  GET /api/complaints
 * @access Private (Admin / Officer)
 */
const getAllComplaints = async (req, res) => {
  try {
    // Optional: role-based protection
    if (!["admin", "officer"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all complaints",
      error: error.message,
    });
  }
};

/**
 * @desc   Update complaint status
 * @route  PUT /api/complaints/:id/status
 * @access Private (Admin / Officer)
 */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["pending", "in_progress", "resolved"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update complaint status",
      error: error.message,
    });
  }
};

module.exports = { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus };
