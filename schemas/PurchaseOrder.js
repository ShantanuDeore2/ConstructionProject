const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const materialDetailsSchema = require("./MaterialDetail");
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
    materials: [materialDetailsSchema], // An array of material purchase details
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

// add middleware for error handling
applyErrorHandlerHooks(purchaseOrderSchema);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
