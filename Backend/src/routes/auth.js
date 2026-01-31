const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Admin-only route (optional, future)
router.post("/register-officer", protect, isAdmin, register);

module.exports = router;
