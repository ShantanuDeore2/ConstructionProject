const WorkItem = require("../../schemas/WorkItem");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(WorkItem);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
