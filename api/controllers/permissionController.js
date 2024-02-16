const Permission = require("../../schemas/Permission");
const createError = require("http-errors");
const logger = require("../../utils/logger");

exports.createPermission = async (req, res, next) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    logger.info(`Permission ${permission} created`);
    res.status(201).json(permission);
  } catch (error) {
    console.dir(error);
    logger.error("Error creating permission", { error: error.message });
    next(createError(400, error.message));
  }
};

exports.getPermissions = async (req, res, next) => {
  try {
    const permissions = {
      label: "Permission",
      description: "Permission Description",
    };
    logger.info(`Permission ${permissions} send to client`);
    res.json(permissions);
  } catch (error) {
    next(createError(500, error.message));
  }
};
