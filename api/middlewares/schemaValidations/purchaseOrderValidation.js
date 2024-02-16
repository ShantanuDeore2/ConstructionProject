const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Assuming use of Joi-objectid for ObjectId validation within materialDetails

/**
 * @description Joi schema object for validating purchase order
 * @property {String} purchaseNumber - The purchase number of the order, required and unique
 * @property {String} vendor - The vendor of the order, required
 * @property {Array} materials - The materials of the order, validated using the material details schema
 */
exports.validatePurchaseOrder = celebrate({
  body: Joi.object({
    purchaseNumber: Joi.string().required().trim().max(255),
    vendor: Joi.string().required().trim().max(255),
    materials: Joi.array()
      .items(Joi.object(validateMaterialDetails))
      .required(),
  }),
});
