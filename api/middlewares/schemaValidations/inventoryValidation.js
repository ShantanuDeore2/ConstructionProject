const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields
const validateMaterialDetails = Joi.object({
  material: JoiObjectId().required(), // Validate material ID as an ObjectId
  quantity: Joi.number().required(),
  pricePerUnit: Joi.number().required(),
});

/**
 * @description Joi schema object for validating inventory
 * @property {Object} materialDetail - The material detail, validated using the material details validation schema
 */
exports.validateInventory = celebrate({
  body: Joi.object({
    materialDetail: validateMaterialDetails.required(),
  }),
});
