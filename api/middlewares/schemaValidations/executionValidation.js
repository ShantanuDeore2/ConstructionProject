const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating execution
 * @property {Date} date - The date of the execution, required
 * @property {String} type - The type of the execution, must be one of ["daily", "weekly", "monthly", "yearly"], required
 * @property {Array} workItems - The work items associated with the execution, each work item includes an ID and actual quantity, required
 */
exports.validateExecution = celebrate({
  body: Joi.object({
    date: Joi.date().required(),
    type: Joi.string().required().valid("daily", "weekly", "monthly", "yearly"),
    workItems: Joi.array()
      .items(
        Joi.object({
          workItem: JoiObjectId().required(), // Validate work item ID as an ObjectId
          actualQuantity: Joi.number().required(),
        })
      )
      .required(),
  }),
});
