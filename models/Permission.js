const mongoose = require("mongoose");

/**
 * Permission Schema
 * @property {String} name - Unique name of the permission
 * @property {String} description - Description of the permission
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of last update
 * @property {Date} deletedAt - Date of deletion
 * @requires mongoose
 * @type {mongoose.Schema}
 */
const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Permission", permissionSchema);
