const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * Permission Schema - Represents a permission that can be assigned to a role
 * @property {String} name - Unique name of the permission
 * @property {String} description - Description of the permission
 * @type {mongoose.Schema}
 */
const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(permissionSchema);

// Apply the mongoose-delete plugin
permissionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(permissionSchema);

module.exports = mongoose.model("Permission", permissionSchema);
