const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * WorkType Schema - Represents a type of work
 * @property {String} name - The name of the work type
 * @property {String} description - The description of the work type
 * @type {mongoose.Schema}
 */
const workTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(workTypeSchema);

// Apply the mongoose-delete plugin
workTypeSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(workTypeSchema);

module.exports = mongoose.model("WorkType", workTypeSchema);
