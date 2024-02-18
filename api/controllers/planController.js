const PlanService = require("../services/PlanService");
const logger = require("../../utils/logger");
const planService = new PlanService();

// Create a new plan
exports.createPlan = async (req, res, next) => {
  try {
    const doc = await planService.create(req.body);
    logger.info(`Plan ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating plan", { error: error.message });
    next(error);
  }
};

// Get a single plan
exports.findPlanById = async (req, res, next) => {
  try {
    const doc = await planService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading plan", { error: error.message });
    next(error);
  }
};

// Get all plans
exports.findAllPlans = async (req, res, next) => {
  try {
    const docs = await planService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all plans", { error: error.message });
    next(error);
  }
};

// Update a plan
exports.updatePlan = async (req, res, next) => {
  try {
    const doc = await planService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating plan", { error: error.message });
    next(error);
  }
};

// Delete a plan
exports.deletePlan = async (req, res, next) => {
  try {
    await planService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting plan", { error: error.message });
    next(error);
  }
};
