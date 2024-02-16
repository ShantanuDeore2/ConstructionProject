const { celebrate, Joi } = require("celebrate");

/**
 * @description Joi schema object for validating permission
 * @property {String} name - Unique name of the permission
 * @property {String} description - Description of the permission
 */
exports.validatePermission = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim(),
  }),
});
