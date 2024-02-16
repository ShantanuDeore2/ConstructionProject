const { celebrate, Joi } = require("celebrate");
const JoiObjectId = require("joi-objectid")(Joi); // Use Joi-objectid to validate ObjectId fields

/**
 * @description Joi schema object for validating work item
 * @property {mongoose.Schema.Types.ObjectId} workType - The work type ID, required
 * @property {mongoose.Schema.Types.ObjectId} project - The project ID, required
 * @property {Number} weightage - The weightage of the work item, required
 * @property {Number} percentageDone - The percentage done of the work item, required, with a default of 0
 * @property {Array} children - The children work items, each an ObjectId
 * @property {Array} materialsRequired - The materials required for the work item, including material ID and quantity
 */
exports.validateWorkItem = celebrate({
  body: Joi.object({
    workType: JoiObjectId().required(),
    project: JoiObjectId().required(),
    weightage: Joi.number().required(),
    percentageDone: Joi.number().required().min(0).max(100),
    children: Joi.array().items(JoiObjectId()).optional(),
    materialsRequired: Joi.array()
      .items(
        Joi.object({
          material: JoiObjectId().required(),
          quantity: Joi.number().required(),
        })
      )
      .optional(),
  }),
});
