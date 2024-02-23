const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * DepartmentService
 * @description :: Business logic and services for departments
 */
module.exports = class DepartmentService {
  constructor() {
    let Department;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Department = require("../schemas/Department");
      DAO = require("../dao/MongoDAO");
    } else {
      Department = require("../schemas/Department");
      DAO = require("../dao/MongoDAO");
    }

    this.departmentDao = new DAO(Department);
  }

  // Create a new product
  async create(departmentData) {
    const department = await this.departmentDao.create(departmentData);
    return department;
  }

  // Get all departments
  async findAll() {
    const departments = await this.departmentDao.findAll();
    return departments;
  }

  // Get a single product
  async findById(departmentId) {
    const department = await this.departmentDao.findById(departmentId);
    if (!department) {
      throw new NotFoundError("Department not found");
    }
    return department;
  }

  // Update a single product
  async updateById(departmentId, departmentData) {
    const department = await this.departmentDao.updateById(
      departmentId,
      departmentData
    );
    if (!department) {
      throw NotFoundError("Department not found");
    }
    return department;
  }

  // Delete a single product
  async deleteById(departmentId) {
    await this.departmentDao.deleteById(departmentId);
  }

  // Other complex business logics
};
