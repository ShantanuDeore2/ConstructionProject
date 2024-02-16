const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating plan
 * @property {Date} date - The date of the plan, required
 * @property {String} type - The type of the plan, must be one of ["daily", "weekly", "monthly", "yearly"], required
 * @property {Array} workItems - The work items associated with the plan, each work item includes an ID and estimated quantity, required
 */
exports.validatePlan = celebrate({
  body: Joi.object({
    date: Joi.date().required(),
    type: Joi.string().required().valid("daily", "weekly", "monthly", "yearly"),
    workItems: Joi.array()
      .items(
        Joi.object({
          workItem: JoiObjectId().required(), // Validate work item ID as an ObjectId
          estimatedQuantity: Joi.number().required(),
        })
      )
      .required(),
  }),
});
