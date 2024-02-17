const Transaction = require("../../schemas/Transaction");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Transaction);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
