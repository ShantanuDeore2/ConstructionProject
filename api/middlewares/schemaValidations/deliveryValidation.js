const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Assuming use of Joi-objectid for ObjectId validation
const validateMaterialDetails = Joi.object({
  material: JoiObjectId().required(), // Validate material ID as an ObjectId
  quantity: Joi.number().required(),
  pricePerUnit: Joi.number().required(),
});
// Joi schema for validating delivery
exports.validateDelivery = celebrate({
  body: Joi.object({
    purchaseOrder: JoiObjectId().required(), // Validating ObjectId string for the purchase order
    deliveredMaterial: Joi.array().items(validateMaterialDetails).required(), // Validate array of delivered materials
    deliveryDate: Joi.date().required(),
  }),
});
