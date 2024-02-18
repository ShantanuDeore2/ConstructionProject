/**
 * MaterialDetailService
 * @description :: Business logic and services for MaterialDetail
 */
module.exports = class MaterialDetailService {
  constructor() {
    let MaterialDetail = require("../schemas/MaterialDetail");
    let MongoDao = require("../dao/MongoDAO");
    this.materialDetailDao = new MongoDao(MaterialDetail);
  }

  // Create a new materialDetail
  async create(materialDetailData) {
    const materialDetail = await this.materialDetailDao.create(
      materialDetailData
    );
    return materialDetail;
  }

  // Get all MaterialDetails
  async findAll() {
    const materialDetails = await this.materialDetailDao.findAll();
    return materialDetails;
  }

  // Get a single materialDetail
  async findById(materialDetailId) {
    const materialDetail = await this.materialDetailDao.findById(
      materialDetailId
    );
    return materialDetail;
  }

  // Update a single materialDetail
  async updateById(materialDetailId, materialDetailData) {
    const materialDetail = await this.materialDetailDao.updateById(
      materialDetailId,
      materialDetailData
    );
    return materialDetail;
  }

  // Delete a single materialDetail
  async deleteById(materialDetailId) {
    await this.materialDetailDao.deleteById(materialDetailId);
  }

  // Other complex business logics
};
