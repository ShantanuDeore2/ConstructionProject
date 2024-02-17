const User = require("../../schemas/User");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(User);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
