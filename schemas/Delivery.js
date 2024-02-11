// Description: Schema for Delivery
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const purchaseOrderMaterialSchema = require("./PurchaseOrderMaterial"); // Import the schema

/**
 * Delivery Schema - Represents a delivery with a purchase order, delivered materials, and delivery date
 * @property {mongoose.Schema.Types.ObjectId} purchaseOrder - The purchase order ID
 * @property {Array} deliveredMaterial - The delivered materials
 * @property {Date} deliveryDate - The delivery date
 * @type {mongoose.Schema}
 */
const deliverySchema = new mongoose.Schema(
  {
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    // Embed the purchaseOrderMaterialSchema directly for each delivery item
    deliveredMaterial: [purchaseOrderMaterialSchema],
    deliveryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(deliverySchema);

// Apply the mongoose-delete plugin
deliverySchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// TODO: add middleware for error handling

module.exports = mongoose.model("Delivery", deliverySchema);
