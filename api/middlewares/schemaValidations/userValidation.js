const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating user
 * @property {String} fullName - The full name of the user, required and trimmed
 * @property {mongoose.Schema.Types.ObjectId} department - The department ID the user belongs to, required
 */
exports.validateUser = celebrate({
  body: Joi.object({
    fullName: Joi.string().required().trim().max(255),
    department: JoiObjectId().required(), // Validate department ID as an ObjectId
  }),
});
