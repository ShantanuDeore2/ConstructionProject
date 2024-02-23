const WorkTypeService = require("../services/workTypeService");
const logger = require("../../utils/logger");
const worktypeService = new WorkTypeService();

// Create a new worktype
exports.createWorkType = async (req, res, next) => {
  const doc = await worktypeService.create(req.body);
  logger.info(`WorkType ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single worktype
exports.findWorkTypeById = async (req, res, next) => {
  const doc = await worktypeService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all worktypes
exports.findAllWorkTypes = async (req, res, next) => {
  const docs = await worktypeService.findAll();
  res.status(200).json(docs);
};

// Update a worktype
exports.updateWorkType = async (req, res, next) => {
  const doc = await worktypeService.updateById(req.params.id, req.body);
  logger.info(`WorkType ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a worktype
exports.deleteWorkType = async (req, res, next) => {
  await worktypeService.deleteById(req.params.id);
  logger.info(`WorkType ${req.params.id} deleted`);
  res.status(204).send();
};
