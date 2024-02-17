const PurchaseOrder = require("../../schemas/PurchaseOrder");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(PurchaseOrder);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
