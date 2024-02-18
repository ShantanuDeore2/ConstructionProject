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

// departmentSchema.pre("save", async function (next) {
//   // `this` refers to the instance of the Department being saved
//   const permissionIds = this.permissions;

//   for (const permissionId of permissionIds) {
//     const permissionExists = await Permission.findById(permissionId);
//     if (!permissionExists) {
//       // If a permission doesn't exist, throw an error
//       return next(
//         new Error(`Permission with ID ${permissionId} does not exist`)
//       );
//     }
//   }

//   // If all permissions exist, proceed to save the Department
//   next();
// });

// add middleware for error handling
applyErrorHandlerHooks(departmentSchema);

module.exports = mongoose.model("Department", departmentSchema);
