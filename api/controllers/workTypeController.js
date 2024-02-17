const WorkType = require("../../schemas/WorkType");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(WorkType);

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
