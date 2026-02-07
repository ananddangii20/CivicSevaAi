const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/civicseva";

// Prevent multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
