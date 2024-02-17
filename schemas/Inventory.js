// Description: Schema for Inventory.
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const materialDetailsSchema = require("./MaterialDetail").schema; // Import the schema

/**
 * Inventory Schema - Represents an inventory with a material detail
 * @property {mongoose.Schema} materialDetail - The material detail
 * @type {mongoose.Schema}
 */
const inventorySchema = new mongoose.Schema(
  {
    // Embed the materialDetailsSchema directly
    materialDetail: materialDetailsSchema,
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(inventorySchema);

// Apply the mongoose-delete plugin
inventorySchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(inventorySchema);

module.exports = mongoose.model("Inventory", inventorySchema);
