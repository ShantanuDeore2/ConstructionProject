const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating project
 * @property {String} name - Name of the project, required and must be trimmed
 * @property {Number} budget - Budget of the project, required
 * @property {Date} deadline - Deadline of the project, required
 * @property {Array} workItems - Work items associated with the project, each identified by an ObjectId
 */
exports.validateProject = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().max(255),
    budget: Joi.number().required(),
    deadline: Joi.date().required(),
    workItems: Joi.array().items(JoiObjectId()).optional(), // Validate work item IDs as ObjectId
  }),
});
