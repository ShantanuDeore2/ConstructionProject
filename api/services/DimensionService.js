/**
 * DimensionService
 * @description :: Business logic and services for Dimension
 */
module.exports = class DimensionService {
  constructor() {
    let Dimension = require("../schemas/Dimension");
    let MongoDao = require("../dao/MongoDAO");
    this.dimensionDao = new MongoDao(Dimension);
  }

  // Create a new dimension
  async create(dimensionData) {
    const dimension = await this.dimensionDao.create(dimensionData);
    return dimension;
  }

  // Get all Dimensions
  async findAll() {
    const dimensions = await this.dimensionDao.findAll();
    return dimensions;
  }

  // Get a single dimension
  async findById(dimensionId) {
    const dimension = await this.dimensionDao.findById(dimensionId);
    return dimension;
  }

  // Update a single dimension
  async updateById(dimensionId, dimensionData) {
    const dimension = await this.dimensionDao.updateById(
      dimensionId,
      dimensionData
    );
    return dimension;
  }

  // Delete a single dimension
  async deleteById(dimensionId) {
    await this.dimensionDao.deleteById(dimensionId);
  }

  // Other complex business logics
};
