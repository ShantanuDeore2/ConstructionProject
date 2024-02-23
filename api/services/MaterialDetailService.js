const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * MaterialDetailService
 * @description :: Business logic and services for materialdetails
 */
module.exports = class MaterialDetailService {
  constructor() {
    let MaterialDetail;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      MaterialDetail = require("../schemas/MaterialDetail");
      DAO = require("../dao/MongoDAO");
    } else {
      MaterialDetail = require("../schemas/MaterialDetail");
      DAO = require("../dao/MongoDAO");
    }

    this.materialdetailDao = new DAO(MaterialDetail);
  }

  // Create a new product
  async create(materialdetailData) {
    const materialdetail = await this.materialdetailDao.create(materialdetailData);
    return materialdetail;
  }

  // Get all materialdetails
  async findAll() {
    const materialdetails = await this.materialdetailDao.findAll();
    return materialdetails;
  }

  // Get a single product
  async findById(materialdetailId) {
    const materialdetail = await this.materialdetailDao.findById(materialdetailId);
    if (!materialdetail) {
      throw new NotFoundError("MaterialDetail not found");
    }
    return materialdetail;
  }

  // Update a single product
  async updateById(materialdetailId, materialdetailData) {
    const materialdetail = await this.materialdetailDao.updateById(
      materialdetailId,
      materialdetailData
    );
    if (!materialdetail) {
      throw NotFoundError("MaterialDetail not found");
    }
    return materialdetail;
  }

  // Delete a single product
  async deleteById(materialdetailId) {
    await this.materialdetailDao.deleteById(materialdetailId);
  }

  // Other complex business logics
};
