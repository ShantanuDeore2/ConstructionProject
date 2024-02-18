/**
 * ProjectService
 * @description :: Business logic and services for Project
 */
module.exports = class ProjectService {
  constructor() {
    let Project = require("../schemas/Project");
    let MongoDao = require("../dao/MongoDAO");
    this.projectDao = new MongoDao(Project);
  }

  // Create a new project
  async create(projectData) {
    const project = await this.projectDao.create(projectData);
    return project;
  }

  // Get all Projects
  async findAll() {
    const projects = await this.projectDao.findAll();
    return projects;
  }

  // Get a single project
  async findById(projectId) {
    const project = await this.projectDao.findById(projectId);
    return project;
  }

  // Update a single project
  async updateById(projectId, projectData) {
    const project = await this.projectDao.updateById(
      projectId,
      projectData
    );
    return project;
  }

  // Delete a single project
  async deleteById(projectId) {
    await this.projectDao.deleteById(projectId);
  }

  // Other complex business logics
};
