const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const dimensionSchema = require("./Dimension");
const applyCategoryHook = require("./Hooks/categoryHook");

/**
 * Material Schema - Represents a material with a name, unit, and category
 * @property {String} name - Unique name of the material
 * @property {String} unit - The unit of the material
 * @property {Array} dimensions - The dimensions of the material
 * @property {String} category - The category of the material
 * @property {String} label - The label of the material
 * @type {mongoose.Schema}
 */
const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    dimensions: {
      type: [dimensionSchema],
      required: false,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      trim: true,
      required: false,
    },
  },
  { timestamps: true }
);

// Apply pre-save middleware for category defaulting
materialSchema.pre("save", preSaveCategoryMiddleware);

// Apply category hook
applyCategoryHook(materialSchema);
// Apply logging hooks
applyLoggingHooks(materialSchema);

// Apply mongoose-delete plugin
materialSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// TODO: add middleware for error handling

module.exports = mongoose.model("Material", materialSchema);
