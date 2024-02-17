const Execution = require("../../schemas/Execution");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Execution);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
