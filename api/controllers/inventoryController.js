const Inventory = require("../../schemas/Inventory");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Inventory);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
