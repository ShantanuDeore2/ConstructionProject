const { celebrate, Joi } = require("celebrate");
const { validateDimension } = require("./dimensionValidation");

/**
 * @description Joi schema object for validating material
 * @property {String} name - Unique name of the material
 * @property {String} unit - The unit of the material
 * @property {Array} dimensions - The dimensions of the material, validated using the dimension validation schema
 * @property {String} category - The category of the material
 * @property {String} label - The label of the material, optional
 */
exports.validateMaterial = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().max(255),
    unit: Joi.string().required().trim().max(255),
    dimensions: Joi.array().items(Joi.object(validateDimension)).optional(),
    category: Joi.string().required().trim().max(255),
    label: Joi.string().trim().optional(),
  }),
});
