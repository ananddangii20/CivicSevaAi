const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes – verifies JWT
 */
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach full user (without password)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Not authorized, token failed",
            error: error.message,
        });
    }
};

/**
 * Admin only
 */
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

/**
 * Admin or Officer
 */
const isOfficerOrAdmin = (req, res, next) => {
    if (!["admin", "officer"].includes(req.user.role)) {
        return res.status(403).json({ message: "Officer or Admin access required" });
    }
    next()
};

module.exports = { protect, isAdmin, isOfficerOrAdmin };
