/**
 * PlanService
 * @description :: Business logic and services for Plan
 */
module.exports = class PlanService {
  constructor() {
    let Plan = require("../schemas/Plan");
    let MongoDao = require("../dao/MongoDAO");
    this.planDao = new MongoDao(Plan);
  }

  // Create a new plan
  async create(planData) {
    const plan = await this.planDao.create(planData);
    return plan;
  }

  // Get all Plans
  async findAll() {
    const plans = await this.planDao.findAll();
    return plans;
  }

  // Get a single plan
  async findById(planId) {
    const plan = await this.planDao.findById(planId);
    return plan;
  }

  // Update a single plan
  async updateById(planId, planData) {
    const plan = await this.planDao.updateById(
      planId,
      planData
    );
    return plan;
  }

  // Delete a single plan
  async deleteById(planId) {
    await this.planDao.deleteById(planId);
  }

  // Other complex business logics
};
