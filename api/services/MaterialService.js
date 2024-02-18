/**
 * MaterialService
 * @description :: Business logic and services for Material
 */
module.exports = class MaterialService {
  constructor() {
    let Material = require("../schemas/Material");
    let MongoDao = require("../dao/MongoDAO");
    this.materialDao = new MongoDao(Material);
  }

  // Create a new material
  async create(materialData) {
    const material = await this.materialDao.create(materialData);
    return material;
  }

  // Get all Materials
  async findAll() {
    const materials = await this.materialDao.findAll();
    return materials;
  }

  // Get a single material
  async findById(materialId) {
    const material = await this.materialDao.findById(materialId);
    return material;
  }

  // Update a single material
  async updateById(materialId, materialData) {
    const material = await this.materialDao.updateById(
      materialId,
      materialData
    );
    return material;
  }

  // Delete a single material
  async deleteById(materialId) {
    await this.materialDao.deleteById(materialId);
  }

  // Other complex business logics
};
