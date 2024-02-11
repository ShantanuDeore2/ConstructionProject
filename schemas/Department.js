const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * Department Schema - Represents a department that can have a set of permissions
 * @property {String} departmentName - Unique name of the department
 * @property {Array} permissions - Set of permissions assigned to the department
 * @type {mongoose.Schema}
 */
const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(departmentSchema);

// Apply the mongoose-delete plugin
departmentSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(departmentSchema);

module.exports = mongoose.model("Department", departmentSchema);
