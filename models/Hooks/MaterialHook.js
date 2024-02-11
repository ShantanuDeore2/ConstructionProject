/**
 * Applies a pre-save hook to set the default category value to the schema
 * @param {mongoose.Schema} schema - The schema to apply the hook to
 * @returns {void}
 */
module.exports = function applyCategoryHook(schema) {
  schema.pre("save", function (next) {
    if (!this.category) {
      this.category = this.name; // Default category to name if not set
    }
    next();
  });
};
