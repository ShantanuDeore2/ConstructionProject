const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * MaterialService
 * @description :: Business logic and services for materials
 */
module.exports = class MaterialService {
  constructor() {
    let Material;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Material = require("../schemas/Material");
      DAO = require("../dao/MongoDAO");
    } else {
      Material = require("../schemas/Material");
      DAO = require("../dao/MongoDAO");
    }

    this.materialDao = new DAO(Material);
  }

  // Create a new product
  async create(materialData) {
    const material = await this.materialDao.create(materialData);
    return material;
  }

  // Get all materials
  async findAll() {
    const materials = await this.materialDao.findAll();
    return materials;
  }

  // Get a single product
  async findById(materialId) {
    const material = await this.materialDao.findById(materialId);
    if (!material) {
      throw new NotFoundError("Material not found");
    }
    return material;
  }

  // Update a single product
  async updateById(materialId, materialData) {
    const material = await this.materialDao.updateById(
      materialId,
      materialData
    );
    if (!material) {
      throw NotFoundError("Material not found");
    }
    return material;
  }

  // Delete a single product
  async deleteById(materialId) {
    await this.materialDao.deleteById(materialId);
  }

  // Other complex business logics
};
