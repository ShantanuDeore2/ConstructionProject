const Delivery = require("../../schemas/Delivery");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Delivery);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
