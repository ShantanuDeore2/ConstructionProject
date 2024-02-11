// Description: Schema for Transactions
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * Transactions Schema - Represents a financial transaction including a reference to a purchase order, vendor name, and transaction amount
 * @property {mongoose.Schema.Types.ObjectId} purchaseOrder - The purchase order ID reference
 * @property {String} vendor - The name of the vendor associated with the transaction
 * @property {Number} amount - The amount of the transaction
 * @type {mongoose.Schema}
 */
const transactionsSchema = new mongoose.Schema(
  {
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    vendor: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Apply logging hooks to the schema for audit purposes
applyLoggingHooks(transactionsSchema);

// Apply the mongoose-delete plugin for soft deletion capabilities
transactionsSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(transactionsSchema);

module.exports = mongoose.model("Transaction", transactionsSchema);
