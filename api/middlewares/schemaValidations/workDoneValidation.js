const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating work done
 * @property {Date} date - The date of the work done, required
 * @property {Array} workItems - The work items completed on this date, each work item includes an ID and actual quantity
 */
exports.validateWorkDone = celebrate({
  body: Joi.object({
    date: Joi.date().required(),
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
