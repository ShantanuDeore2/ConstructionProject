const DepartmentService = require("../services/DepartmentService");
const logger = require("../../utils/logger");
const departmentService = new DepartmentService();

// Create a new department
exports.createDepartment = async (req, res, next) => {
  try {
    const doc = await departmentService.create(req.body);
    logger.info(`Department ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating department", { error: error.message });
    next(error);
  }
};

// Get a single department
exports.findDepartmentById = async (req, res, next) => {
  try {
    const doc = await departmentService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading department", { error: error.message });
    next(error);
  }
};

// Get all departments
exports.findAllDepartments = async (req, res, next) => {
  try {
    const docs = await departmentService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all departments", { error: error.message });
    next(error);
  }
};

// Update a department
exports.updateDepartment = async (req, res, next) => {
  try {
    const doc = await departmentService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating department", { error: error.message });
    next(error);
  }
};

// Delete a department
exports.deleteDepartment = async (req, res, next) => {
  try {
    await departmentService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting department", { error: error.message });
    next(error);
  }
};
