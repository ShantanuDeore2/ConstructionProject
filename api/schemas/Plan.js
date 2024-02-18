const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const Schema = mongoose.Schema;

/**
 * Plan Schema - Represents a plan with a date, type, and work items
 * @property {Date} date - The date of the plan
 * @property {String} type - The type of the plan
 * @property {Array} workItems - The work items associated with the plan
 * @type {mongoose.Schema}
 * */
const planSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    workItems: [
      {
        workItem: {
          type: Schema.Types.ObjectId,
          ref: "WorkItem",
          required: true,
        },
        estimatedQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(planSchema);

// Apply the mongoose-delete plugin
planSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// Add middleware for error handling
applyErrorHandlerHooks(planSchema);

module.exports = mongoose.model("Plan", planSchema);
