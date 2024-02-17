const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const Schema = mongoose.Schema;

/**
 * Purchase Order Material Schema - Represents a material with a quantity and price per unit
 * @property {mongoose.Schema.Types.ObjectId} material - The material ID
 * @property {Number} quantity - The quantity of the material
 * @property {Number} pricePerUnit - The price per unit of the material
 * @type {mongoose.Schema}
 */
const materialDetailsSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
});

// Apply logging hooks to the schema
applyLoggingHooks(materialDetailsSchema);

// Apply the mongoose-delete plugin
materialDetailsSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(materialDetailsSchema);

module.exports = mongoose.model("MaterialDetail", materialDetailsSchema);
