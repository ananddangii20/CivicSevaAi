const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // never return password
    },
    role: {
      type: String,
      enum: ["user", "admin", "officer"],
      default: "user",
    },
    department: {
      type: String,
      default: null, // useful for officers
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
