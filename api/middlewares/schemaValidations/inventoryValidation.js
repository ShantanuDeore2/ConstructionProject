const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields
const { validateMaterialDetails } = require("./materialDetailsValidation");

/**
 * @description Joi schema object for validating inventory
 * @property {Object} materialDetail - The material detail, validated using the material details validation schema
 */
exports.validateInventory = celebrate({
  body: Joi.object({
    materialDetail: Joi.object(validateMaterialDetails).required(),
  }),
});
