const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating transactions
 * @property {mongoose.Schema.Types.ObjectId} purchaseOrder - The purchase order ID reference, required
 * @property {String} vendor - The name of the vendor associated with the transaction, required and trimmed
 * @property {Number} amount - The amount of the transaction, required
 */
exports.validateTransaction = celebrate({
  body: Joi.object({
    purchaseOrder: JoiObjectId().required(), // Validate purchase order ID as an ObjectId
    vendor: Joi.string().required().trim().max(255),
    amount: Joi.number().required(),
  }),
});
