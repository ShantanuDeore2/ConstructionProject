const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const Schema = mongoose.Schema;

/**
 * Execution Schema - Represents an execution of work items
 * @property {Date} date - The date of the execution
 * @property {String} type - The type of the execution
 * @property {Array} workItems - The work items associated with the execution
 * @type {mongoose.Schema}
 * */
const executionSchema = new Schema(
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
applyLoggingHooks(executionSchema);

// Apply the mongoose-delete plugin
executionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// Add middleware for error handling
applyErrorHandlerHooks(executionSchema);

module.exports = mongoose.model("Execution", executionSchema);
