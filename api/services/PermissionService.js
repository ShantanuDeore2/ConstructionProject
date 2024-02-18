/**
 * PermissionService
 * @description :: Business logic and services for permissions
 */
module.exports = class PermissionService {
  constructor() {
    let Permission = require("../schemas/Permission");
    let MongoDao = require("../dao/MongoDAO");
    this.permissionDao = new MongoDao(Permission);
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
    return permission;
  }

  // Update a single product
  async updateById(permissionId, permissionData) {
    const permission = await this.permissionDao.updateById(
      permissionId,
      permissionData
    );
    return permission;
  }

  // Delete a single product
  async deleteById(permissionId) {
    await this.permissionDao.deleteById(permissionId);
  }

  // Other complex business logics
};
