const ExecutionService = require("../services/ExecutionService");
const logger = require("../../utils/logger");
const executionService = new ExecutionService();

// Create a new execution
exports.createExecution = async (req, res, next) => {
  try {
    const doc = await executionService.create(req.body);
    logger.info(`Execution ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating execution", { error: error.message });
    next(error);
  }
};

// Get a single execution
exports.findExecutionById = async (req, res, next) => {
  try {
    const doc = await executionService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading execution", { error: error.message });
    next(error);
  }
};

// Get all executions
exports.findAllExecutions = async (req, res, next) => {
  try {
    const docs = await executionService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all executions", { error: error.message });
    next(error);
  }
};

// Update a execution
exports.updateExecution = async (req, res, next) => {
  try {
    const doc = await executionService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating execution", { error: error.message });
    next(error);
  }
};

// Delete a execution
exports.deleteExecution = async (req, res, next) => {
  try {
    await executionService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting execution", { error: error.message });
    next(error);
  }
};
