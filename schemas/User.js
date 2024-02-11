const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * User Schema - Represents a user with a full name and associated department
 * @property {String} fullName - The full name of the user
 * @property {mongoose.Schema.Types.ObjectId} department - The department ID the user belongs to
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(userSchema);

// Apply the mongoose-delete plugin
userSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(userSchema);

module.exports = mongoose.model("User", userSchema);
