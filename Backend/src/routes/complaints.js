const express = require("express");
const router = express.Router();

// Controllers
const {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus,
} = require("../controllers/complaintController");

// Middleware
const { protect, isAdmin } = require("../middleware/auth.middleware");

// Routes

// Create complaint (User)
router.post("/", protect, createComplaint);

// Get logged-in user's complaints
router.get("/me", protect, getMyComplaints);

// Get all complaints (Admin)
router.get("/", protect, isAdmin, getAllComplaints);

// Update complaint status (Admin)
router.patch("/:id/status", protect, isAdmin, updateComplaintStatus);

module.exports = router;
