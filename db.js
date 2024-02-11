// Description: This file is used to connect to MongoDB.
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connect to MongoDB
 * @requires mongoose
 * @requires dotenv
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
