const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * DimensionService
 * @description :: Business logic and services for dimensions
 */
module.exports = class DimensionService {
  constructor() {
    let Dimension;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Dimension = require("../schemas/Dimension");
      DAO = require("../dao/MongoDAO");
    } else {
      Dimension = require("../schemas/Dimension");
      DAO = require("../dao/MongoDAO");
    }

    this.dimensionDao = new DAO(Dimension);
  }

  // Create a new product
  async create(dimensionData) {
    const dimension = await this.dimensionDao.create(dimensionData);
    return dimension;
  }

  // Get all dimensions
  async findAll() {
    const dimensions = await this.dimensionDao.findAll();
    return dimensions;
  }

  // Get a single product
  async findById(dimensionId) {
    const dimension = await this.dimensionDao.findById(dimensionId);
    if (!dimension) {
      throw new NotFoundError("Dimension not found");
    }
    return dimension;
  }

  // Update a single product
  async updateById(dimensionId, dimensionData) {
    const dimension = await this.dimensionDao.updateById(
      dimensionId,
      dimensionData
    );
    if (!dimension) {
      throw NotFoundError("Dimension not found");
    }
    return dimension;
  }

  // Delete a single product
  async deleteById(dimensionId) {
    await this.dimensionDao.deleteById(dimensionId);
  }

  // Other complex business logics
};
