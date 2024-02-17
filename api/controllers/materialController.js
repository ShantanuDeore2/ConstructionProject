const Material = require("../../schemas/Material");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Material);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
