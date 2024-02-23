const WorkDoneService = require("../services/workDoneService");
const logger = require("../../utils/logger");
const workdoneService = new WorkDoneService();

// Create a new workdone
exports.createWorkDone = async (req, res, next) => {
  const doc = await workdoneService.create(req.body);
  logger.info(`WorkDone ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single workdone
exports.findWorkDoneById = async (req, res, next) => {
  const doc = await workdoneService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all workdones
exports.findAllWorkDones = async (req, res, next) => {
  const docs = await workdoneService.findAll();
  res.status(200).json(docs);
};

// Update a workdone
exports.updateWorkDone = async (req, res, next) => {
  const doc = await workdoneService.updateById(req.params.id, req.body);
  logger.info(`WorkDone ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a workdone
exports.deleteWorkDone = async (req, res, next) => {
  await workdoneService.deleteById(req.params.id);
  logger.info(`WorkDone ${req.params.id} deleted`);
  res.status(204).send();
};
