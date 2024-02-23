const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Assuming use of Joi-objectid for ObjectId validation

// Assuming validateMaterial is defined and structured properly for material validation
// Since validateMaterial is for a complete material object, and here we only need the material ID,
// we create a new Joi validation for the purchase order material details.

exports.validateMaterialDetail = celebrate({
  body: Joi.object({
    material: JoiObjectId().required(), // Validate material ID as an ObjectId
    quantity: Joi.number().required(),
    pricePerUnit: Joi.number().required(),
  }),
});
