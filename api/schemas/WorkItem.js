const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");

/**
 * WorkItem Schema - Represents a work item with a work type, project, weightage, percentage done, children, and materials required
 * @property {mongoose.Schema.Types.ObjectId} workType - The work type ID
 * @property {mongoose.Schema.Types.ObjectId} project - The project ID
 * @property {Number} weightage - The weightage of the work item
 * @property {Number} percentageDone - The percentage done of the work item
 * @property {Array} children - The children work items
 * @property {Array} materialsRequired - The materials required for the work item
 * @type {mongoose.Schema}
 */
const workItemSchema = new Schema(
  {
    workType: {
      type: Schema.Types.ObjectId,
      ref: "WorkType",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    weightage: {
      type: Number,
      required: true,
    },
    percentageDone: {
      type: Number,
      required: true,
      default: 0,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "WorkItem",
      },
    ],
    materialsRequired: [
      {
        material: {
          type: Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(workItemSchema);

// Apply the mongoose-delete plugin
workItemSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(workItemSchema);

module.exports = mongoose.model("WorkItem", workItemSchema);
