const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const applyLoggingHooks = require("./Hooks/loggingHook");
const applyErrorHandlerHooks = require("./Hooks/errorHandlerHook");
const Schema = mongoose.Schema;

/**
 * Project Schema - Represents a project with work items
 * @property {String} name - Name of the project
 * @property {Number} budget - Budget of the project
 * @property {Date} deadline - Deadline of the project
 * @property {Array} workItems - Work items associated with the project
 * @type {mongoose.Schema}
 */
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    workItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "WorkItem",
      },
    ],
  },
  { timestamps: true }
);

// Apply logging hooks to the schema
applyLoggingHooks(projectSchema);

// Apply the mongoose-delete plugin
projectSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

// add middleware for error handling
applyErrorHandlerHooks(projectSchema);

module.exports = mongoose.model("Project", projectSchema);
