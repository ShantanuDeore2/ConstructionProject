const bcrypt = require("bcryptjs");
/**
 * RegisterService
 * @description :: Business logic and services for Register
 */
module.exports = class RegisterService {
  constructor() {
    let User = require("../schemas/User");
    let MongoDao = require("../dao/MongoDAO");
    this.userDao = new MongoDao(User);
  }

  // Create a new user
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    userData.password = hashedPassword;

    const user = await this.userDao.create(userData);
    return user;
  }

  // Other complex business logics
};
