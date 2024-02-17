const Department = require("../../schemas/Department");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Department);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
