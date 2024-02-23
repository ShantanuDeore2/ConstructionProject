const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * PermissionService
 * @description :: Business logic and services for permissions
 */
module.exports = class PermissionService {
  constructor() {
    let Permission;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Permission = require("../schemas/Permission");
      DAO = require("../dao/MongoDAO");
    } else {
      Permission = require("../schemas/Permission");
      DAO = require("../dao/MongoDAO");
    }

    this.permissionDao = new DAO(Permission);
  }

  // Create a new product
  async create(permissionData) {
    const permission = await this.permissionDao.create(permissionData);
    return permission;
  }

  // Get all permissions
  async findAll() {
    const permissions = await this.permissionDao.findAll();
    return permissions;
  }

  // Get a single product
  async findById(permissionId) {
    const permission = await this.permissionDao.findById(permissionId);
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }
    return permission;
  }

  // Update a single product
  async updateById(permissionId, permissionData) {
    const permission = await this.permissionDao.updateById(
      permissionId,
      permissionData
    );
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }
    return permission;
  }

  // Delete a single product
  async deleteById(permissionId) {
    await this.permissionDao.deleteById(permissionId);
  }

  // Other complex business logics
};
