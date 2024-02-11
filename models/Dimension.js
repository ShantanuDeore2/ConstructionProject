const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");

/**
 * Dimension Schema - Represents a dimension with a type, value, and unit
 * @property {String} type - The type of dimension
 * @property {Number} value - The value of the dimension
 * @property {String} unit - The unit of the dimension
 * @type {mongoose.Schema}
 */
const dimensionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    value: { type: Number, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// Apply logging hooks to the schema
applyLoggingHooks(dimensionSchema);

// Apply the mongoose-delete plugin
dimensionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// TODO: add middleware for error handling

module.exports = dimensionSchema;
