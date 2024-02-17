const WorkDone = require("../../schemas/WorkDone");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(WorkDone);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
