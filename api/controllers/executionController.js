const ExecutionService = require("../services/ExecutionService");
const logger = require("../../utils/logger");
const executionService = new ExecutionService();

// Create a new execution
exports.createExecution = async (req, res, next) => {
  const doc = await executionService.create(req.body);
  logger.info(`Execution ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single execution
exports.findExecutionById = async (req, res, next) => {
  const doc = await executionService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all executions
exports.findAllExecutions = async (req, res, next) => {
  const docs = await executionService.findAll();
  res.status(200).json(docs);
};

// Update a execution
exports.updateExecution = async (req, res, next) => {
  const doc = await executionService.updateById(req.params.id, req.body);
  logger.info(`Execution ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a execution
exports.deleteExecution = async (req, res, next) => {
  await executionService.deleteById(req.params.id);
  logger.info(`Execution ${req.params.id} deleted`);
  res.status(204).send();
};
