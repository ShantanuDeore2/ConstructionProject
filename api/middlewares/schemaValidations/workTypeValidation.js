const { celebrate, Joi } = require("celebrate");

/**
 * @description Joi schema object for validating work type
 * @property {String} name - The name of the work type, must be unique and is required
 * @property {String} description - The description of the work type, required
 */
exports.validateWorkType = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().max(255),
    description: Joi.string().required().trim().max(1024),
  }),
});
