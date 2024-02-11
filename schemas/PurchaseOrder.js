const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const purchaseOrderMaterialSchema = require("./PurchaseOrderMaterial");
const Schema = mongoose.Schema;

/**
 * Purchase Order Schema - Represents purchase order with a purchase number, vendor, and materials
 * @property {String} purchaseNumber - The purchase number of the order
 * @property {String} vendor - The vendor of the order
 * @property {Array} materials - The materials of the order
 **/
const purchaseOrderSchema = new Schema(
  {
    purchaseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    materials: [purchaseOrderMaterialSchema], // An array of material purchase details
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(purchaseOrderSchema);

// Apply the mongoose-delete plugin
purchaseOrderSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// TODO: add middleware for error handling

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
