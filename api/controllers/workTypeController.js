const WorkTypeService = require("../services/WorkTypeService");
const logger = require("../../utils/logger");
const workTypeService = new WorkTypeService();

// Create a new workType
exports.createWorkType = async (req, res, next) => {
  try {
    const doc = await workTypeService.create(req.body);
    logger.info(`WorkType ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating workType", { error: error.message });
    next(error);
  }
};

// Get a single workType
exports.findWorkTypeById = async (req, res, next) => {
  try {
    const doc = await workTypeService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading workType", { error: error.message });
    next(error);
  }
};

// Get all workTypes
exports.findAllWorkTypes = async (req, res, next) => {
  try {
    const docs = await workTypeService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all workTypes", { error: error.message });
    next(error);
  }
};

// Update a workType
exports.updateWorkType = async (req, res, next) => {
  try {
    const doc = await workTypeService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating workType", { error: error.message });
    next(error);
  }
};

// Delete a workType
exports.deleteWorkType = async (req, res, next) => {
  try {
    await workTypeService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting workType", { error: error.message });
    next(error);
  }
};
