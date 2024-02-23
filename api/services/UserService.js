const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * UserService
 * @description :: Business logic and services for users
 */
module.exports = class UserService {
  constructor() {
    let User;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      User = require("../schemas/User");
      DAO = require("../dao/MongoDAO");
    } else {
      User = require("../schemas/User");
      DAO = require("../dao/MongoDAO");
    }

    this.userDao = new DAO(User);
  }

  // Create a new product
  async create(userData) {
    const user = await this.userDao.create(userData);
    return user;
  }

  // Get all users
  async findAll() {
    const users = await this.userDao.findAll();
    return users;
  }

  // Get a single product
  async findById(userId) {
    const user = await this.userDao.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  // Update a single product
  async updateById(userId, userData) {
    const user = await this.userDao.updateById(
      userId,
      userData
    );
    if (!user) {
      throw NotFoundError("User not found");
    }
    return user;
  }

  // Delete a single product
  async deleteById(userId) {
    await this.userDao.deleteById(userId);
  }

  // Other complex business logics
};
