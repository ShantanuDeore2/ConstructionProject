const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

/**
 * Permission Schema
 * @property {String} name - Unique name of the permission
 * @property {String} description - Description of the permission
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of last update
 * @property {Date} deletedAt - Date of deletion
 * @requires mongoose
 * @requires mongoose-delete
 * @type {mongoose.Schema}
 */
const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Apply the mongoose-delete plugin
permissionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Permission", permissionSchema);
