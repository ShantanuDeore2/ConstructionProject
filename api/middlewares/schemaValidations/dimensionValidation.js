const { celebrate, Joi } = require("celebrate");

/**
 * @description Joi schema object for validating dimension
 * @property {String} type - The type of dimension
 * @property {Number} value - The value of the dimension
 * @property {String} unit - The unit of the dimension
 */
exports.validateDimension = celebrate({
  body: Joi.object({
    type: Joi.string().required().trim(),
    value: Joi.number().required(),
    unit: Joi.string().required().trim(),
  }),
});
