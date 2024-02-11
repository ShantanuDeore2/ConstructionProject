// This file contains a function that applies logging hooks to all schemas

/**
 * Applies pre-save and post-save hooks to all schemas
 * @param {mongoose.Schema} schema - The schema to apply the hooks to
 * @returns {void}
 */
module.exports = function applyLoggingHooks(schema) {
  // Example of a pre-save hook for all schemas
  schema.pre("save", function (next) {
    console.log(`Saving document for ${this.constructor.modelName}`);
    next();
  });

  // Example of a post-save hook for all schemas
  schema.post("save", function (doc) {
    console.log(`Document for ${this.constructor.modelName} saved: ${doc}`);
  });
};
