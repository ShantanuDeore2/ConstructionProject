const WorkDoneService = require("../services/WorkDoneService");
const logger = require("../../utils/logger");
const workDoneService = new WorkDoneService();

// Create a new workDone
exports.createWorkDone = async (req, res, next) => {
  try {
    const doc = await workDoneService.create(req.body);
    logger.info(`WorkDone ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating workDone", { error: error.message });
    next(error);
  }
};

// Get a single workDone
exports.findWorkDoneById = async (req, res, next) => {
  try {
    const doc = await workDoneService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading workDone", { error: error.message });
    next(error);
  }
};

// Get all workDones
exports.findAllWorkDones = async (req, res, next) => {
  try {
    const docs = await workDoneService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all workDones", { error: error.message });
    next(error);
  }
};

// Update a workDone
exports.updateWorkDone = async (req, res, next) => {
  try {
    const doc = await workDoneService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating workDone", { error: error.message });
    next(error);
  }
};

// Delete a workDone
exports.deleteWorkDone = async (req, res, next) => {
  try {
    await workDoneService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting workDone", { error: error.message });
    next(error);
  }
};
