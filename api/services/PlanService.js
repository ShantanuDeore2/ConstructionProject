const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * PlanService
 * @description :: Business logic and services for plans
 */
module.exports = class PlanService {
  constructor() {
    let Plan;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Plan = require("../schemas/Plan");
      DAO = require("../dao/MongoDAO");
    } else {
      Plan = require("../schemas/Plan");
      DAO = require("../dao/MongoDAO");
    }

    this.planDao = new DAO(Plan);
  }

  // Create a new product
  async create(planData) {
    const plan = await this.planDao.create(planData);
    return plan;
  }

  // Get all plans
  async findAll() {
    const plans = await this.planDao.findAll();
    return plans;
  }

  // Get a single product
  async findById(planId) {
    const plan = await this.planDao.findById(planId);
    if (!plan) {
      throw new NotFoundError("Plan not found");
    }
    return plan;
  }

  // Update a single product
  async updateById(planId, planData) {
    const plan = await this.planDao.updateById(
      planId,
      planData
    );
    if (!plan) {
      throw NotFoundError("Plan not found");
    }
    return plan;
  }

  // Delete a single product
  async deleteById(planId) {
    await this.planDao.deleteById(planId);
  }

  // Other complex business logics
};
