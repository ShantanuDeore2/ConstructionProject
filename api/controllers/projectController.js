const Project = require("../../schemas/Project");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(Project);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
