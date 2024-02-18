const ProjectService = require("../services/ProjectService");
const logger = require("../../utils/logger");
const projectService = new ProjectService();

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const doc = await projectService.create(req.body);
    logger.info(`Project ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating project", { error: error.message });
    next(error);
  }
};

// Get a single project
exports.findProjectById = async (req, res, next) => {
  try {
    const doc = await projectService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading project", { error: error.message });
    next(error);
  }
};

// Get all projects
exports.findAllProjects = async (req, res, next) => {
  try {
    const docs = await projectService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all projects", { error: error.message });
    next(error);
  }
};

// Update a project
exports.updateProject = async (req, res, next) => {
  try {
    const doc = await projectService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating project", { error: error.message });
    next(error);
  }
};

// Delete a project
exports.deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting project", { error: error.message });
    next(error);
  }
};
