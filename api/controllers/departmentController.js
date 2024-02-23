const DepartmentService = require("../services/DepartmentService");
const logger = require("../../utils/logger");
const departmentService = new DepartmentService();

// Create a new department
exports.createDepartment = async (req, res, next) => {
  const doc = await departmentService.create(req.body);
  logger.info(`Department ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single department
exports.findDepartmentById = async (req, res, next) => {
  const doc = await departmentService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all departments
exports.findAllDepartments = async (req, res, next) => {
  const docs = await departmentService.findAll();
  res.status(200).json(docs);
};

// Update a department
exports.updateDepartment = async (req, res, next) => {
  const doc = await departmentService.updateById(req.params.id, req.body);
  logger.info(`Department ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a department
exports.deleteDepartment = async (req, res, next) => {
  await departmentService.deleteById(req.params.id);
  logger.info(`Department ${req.params.id} deleted`);
  res.status(204).send();
};
