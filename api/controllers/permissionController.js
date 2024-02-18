const PermissionService = require("../services/PermissionService");
const logger = require("../../utils/logger");
const permissionService = new PermissionService();

// Create a new permission
exports.createPermission = async (req, res, next) => {
  try {
    const doc = await permissionService.create(req.body);
    logger.info(`Permission ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating permission", { error: error.message });
    next(error);
  }
};

// Get a single permission
exports.findPermissionById = async (req, res, next) => {
  try {
    const doc = await permissionService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading permission", { error: error.message });
    next(error);
  }
};

// Get all permissions
exports.findAllPermissions = async (req, res, next) => {
  try {
    const docs = await permissionService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all permissions", { error: error.message });
    next(error);
  }
};

// Update a permission
exports.updatePermission = async (req, res, next) => {
  try {
    const doc = await permissionService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating permission", { error: error.message });
    next(error);
  }
};

// Delete a permission
exports.deletePermission = async (req, res, next) => {
  try {
    await permissionService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting permission", { error: error.message });
    next(error);
  }
};
