const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * ProjectService
 * @description :: Business logic and services for projects
 */
module.exports = class ProjectService {
  constructor() {
    let Project;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Project = require("../schemas/Project");
      DAO = require("../dao/MongoDAO");
    } else {
      Project = require("../schemas/Project");
      DAO = require("../dao/MongoDAO");
    }

    this.projectDao = new DAO(Project);
  }

  // Create a new product
  async create(projectData) {
    const project = await this.projectDao.create(projectData);
    return project;
  }

  // Get all projects
  async findAll() {
    const projects = await this.projectDao.findAll();
    return projects;
  }

  // Get a single product
  async findById(projectId) {
    const project = await this.projectDao.findById(projectId);
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    return project;
  }

  // Update a single product
  async updateById(projectId, projectData) {
    const project = await this.projectDao.updateById(
      projectId,
      projectData
    );
    if (!project) {
      throw NotFoundError("Project not found");
    }
    return project;
  }

  // Delete a single product
  async deleteById(projectId) {
    await this.projectDao.deleteById(projectId);
  }

  // Other complex business logics
};
