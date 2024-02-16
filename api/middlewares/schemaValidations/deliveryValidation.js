const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Assuming use of Joi-objectid for ObjectId validation
const { validateMaterialDetails } = require("./materialDetailsValidation");

// Joi schema for validating delivery
exports.validateDelivery = celebrate({
  body: Joi.object({
    purchaseOrder: JoiObjectId().required(), // Validating ObjectId string for the purchase order
    deliveredMaterial: Joi.array().items(validateMaterialDetails).required(), // Validate array of delivered materials
    deliveryDate: Joi.date().required(),
  }),
});
