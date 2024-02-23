const ProjectService = require("../services/ProjectService");
const logger = require("../../utils/logger");
const projectService = new ProjectService();

// Create a new project
exports.createProject = async (req, res, next) => {
  const doc = await projectService.create(req.body);
  logger.info(`Project ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single project
exports.findProjectById = async (req, res, next) => {
  const doc = await projectService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all projects
exports.findAllProjects = async (req, res, next) => {
  const docs = await projectService.findAll();
  res.status(200).json(docs);
};

// Update a project
exports.updateProject = async (req, res, next) => {
  const doc = await projectService.updateById(req.params.id, req.body);
  logger.info(`Project ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a project
exports.deleteProject = async (req, res, next) => {
  await projectService.deleteById(req.params.id);
  logger.info(`Project ${req.params.id} deleted`);
  res.status(204).send();
};
