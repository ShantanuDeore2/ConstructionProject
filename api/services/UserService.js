/**
 * UserService
 * @description :: Business logic and services for User
 */
module.exports = class UserService {
  constructor() {
    let User = require("../schemas/User");
    let MongoDao = require("../dao/MongoDAO");
    this.userDao = new MongoDao(User);
  }

  // Create a new user
  async create(userData) {
    const user = await this.userDao.create(userData);
    return user;
  }

  // Get all Users
  async findAll() {
    const users = await this.userDao.findAll();
    return users;
  }

  // Get a single user
  async findById(userId) {
    const user = await this.userDao.findById(userId);
    return user;
  }

  // Update a single user
  async updateById(userId, userData) {
    const user = await this.userDao.updateById(
      userId,
      userData
    );
    return user;
  }

  // Delete a single user
  async deleteById(userId) {
    await this.userDao.deleteById(userId);
  }

  // Other complex business logics
};
