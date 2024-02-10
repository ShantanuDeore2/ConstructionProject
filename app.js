// Description: This file sets up the connection to MongoDB and ....
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const Permission = require("./models/Permission");
const connectDB = require("./db");

// Connect to MongoDB
connectDB();

//Function to create a permission entry
async function createPermission() {
  try {
    // Creating a new permission document
    const permission = new Permission({
      name: "create-user",
      description: "Allows creating a new user account",
    });

    // Saving the permission to the database
    const savedPermission = await permission.save();
    console.log("Permission created:", savedPermission);
  } catch (error) {
    console.error("Error creating permission:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}

//Call the function to create a permission entry
createPermission();

// async function updatePermission(permissionName, updateData) {
//   try {
//     // Update the first document that matches the name
//     const result = await Permission.updateOne(
//       { name: permissionName },
//       { $set: updateData }
//     );
//     console.log("Update result:", result);
//   } catch (error) {
//     console.error("Error updating permission:", error);
//   } finally {
//     // Optionally close the MongoDB connection
//     // mongoose.connection.close();
//   }
// }

// // Example usage:
// updatePermission("create-user", {
//   description: "Allows creating and editing a user",
// });

// async function deletePermission(permissionName) {
//   try {
//     // Delete the first document that matches the name
//     const result = await Permission.delete({ name: permissionName });
//     console.log("Soft Delete result:", result);
//   } catch (error) {
//     console.error("Error deleting permission:", error);
//   } finally {
//     // Optionally close the MongoDB connection
//     // mongoose.connection.close();
//   }
// }

// // Example usage:
// deletePermission("create-user");
