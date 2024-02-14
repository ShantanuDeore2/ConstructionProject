const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const Schema = mongoose.Schema;

/**
 * WorkDone Schema - Represents actual work done with a date and work items
 * @property {Date} date - The date of the work done
 * @property {Array} workItems - The work items completed on this date
 * @type {mongoose.Schema}
 */
const workDoneSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    workItems: [
      {
        workItem: {
          type: Schema.Types.ObjectId,
          ref: "WorkItem",
          required: true,
        },
        actualQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(workDoneSchema);

// Apply the mongoose-delete plugin
workDoneSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// Add middleware for error handling
applyErrorHandlerHooks(workDoneSchema);

module.exports = mongoose.model("WorkDone", workDoneSchema);
