const PlanService = require("../services/PlanService");
const logger = require("../../utils/logger");
const planService = new PlanService();

// Create a new plan
exports.createPlan = async (req, res, next) => {
  const doc = await planService.create(req.body);
  logger.info(`Plan ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single plan
exports.findPlanById = async (req, res, next) => {
  const doc = await planService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all plans
exports.findAllPlans = async (req, res, next) => {
  const docs = await planService.findAll();
  res.status(200).json(docs);
};

// Update a plan
exports.updatePlan = async (req, res, next) => {
  const doc = await planService.updateById(req.params.id, req.body);
  logger.info(`Plan ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a plan
exports.deletePlan = async (req, res, next) => {
  await planService.deleteById(req.params.id);
  logger.info(`Plan ${req.params.id} deleted`);
  res.status(204).send();
};
