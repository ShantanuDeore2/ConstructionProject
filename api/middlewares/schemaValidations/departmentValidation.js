const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating department
 * @property {String} departmentName - Unique name of the department
 * @property {Array} permissions - Set of permissions assigned to the department, each represented by an ObjectId
 */
exports.validateDepartment = celebrate({
  body: Joi.object({
    departmentName: Joi.string().required().trim().max(255),
    permissions: Joi.array().items(JoiObjectId()).optional(),
  }),
});
