const PermissionService = require("../services/PermissionService");
const logger = require("../../utils/logger");
const permissionService = new PermissionService();

// Create a new permission
exports.createPermission = async (req, res, next) => {
  const doc = await permissionService.create(req.body);
  logger.info(`Permission ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single permission
exports.findPermissionById = async (req, res, next) => {
  const doc = await permissionService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all permissions
exports.findAllPermissions = async (req, res, next) => {
  const docs = await permissionService.findAll();
  res.status(200).json(docs);
};

// Update a permission
exports.updatePermission = async (req, res, next) => {
  const doc = await permissionService.updateById(req.params.id, req.body);
  logger.info(`Permission ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a permission
exports.deletePermission = async (req, res, next) => {
  await permissionService.deleteById(req.params.id);
  logger.info(`Permission ${req.params.id} deleted`);
  res.status(204).send();
};
