// This hook is used to handle errors for the following operations:

/**
 * Applies a post-save hook to handle errors for the specified schema
 * @param {mongoose.Schema} schema - The schema to apply the hook to
 * @returns {void}
 */
module.exports = function applyErrorHandler(schema) {
  // A list of operations to handle errors for
  const operations = ["save", "update", "findOneAndUpdate", "insertMany"];

  operations.forEach((operation) => {
    schema.post(operation, function (error, doc, next) {
      if (error.name === "ValidationError") {
        // Concatenate all validation error messages
        const errors = Object.values(error.errors)
          .map((err) => err.message)
          .join(", ");
        next(new Error(`Validation Error: ${errors}`));
      } else if (error.code === 11000) {
        // Handle duplicate key error
        next(new Error("Duplicate key error"));
      } else {
        // Pass through any other types of errors
        next(error);
      }
    });
  });
};
