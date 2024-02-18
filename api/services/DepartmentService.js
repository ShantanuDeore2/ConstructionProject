/**
 * DepartmentService
 * @description :: Business logic and services for Department
 */
module.exports = class DepartmentService {
  constructor() {
    let Department = require("../schemas/Department");
    let MongoDao = require("../dao/MongoDAO");
    this.departmentDao = new MongoDao(Department);
  }

  // Create a new department
  async create(departmentData) {
    const department = await this.departmentDao.create(departmentData);
    return department;
  }

  // Get all Departments
  async findAll() {
    const departments = await this.departmentDao.findAll();
    return departments;
  }

  // Get a single department
  async findById(departmentId) {
    const department = await this.departmentDao.findById(departmentId);
    return department;
  }

  // Update a single department
  async updateById(departmentId, departmentData) {
    const department = await this.departmentDao.updateById(
      departmentId,
      departmentData
    );
    return department;
  }

  // Delete a single department
  async deleteById(departmentId) {
    await this.departmentDao.deleteById(departmentId);
  }

  // Other complex business logics
};
