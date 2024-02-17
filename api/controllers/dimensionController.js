const Dimension = require("../../schemas/Dimension");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Dimension);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
