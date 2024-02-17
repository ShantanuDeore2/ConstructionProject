const Plan = require("../../schemas/Plan");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Plan);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
