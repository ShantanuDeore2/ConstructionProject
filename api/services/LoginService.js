const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("../middlewares/errorHandler");
/**
 * LoginService
 * @description :: Business logic and services for Login
 */
module.exports = class LoginService {
  constructor() {
    let User = require("../schemas/User");
    let MongoDao = require("../dao/MongoDAO");
    this.userDao = new MongoDao(User);
  }

  async tryLogin(req) {
    const { email, password } = req.body;
    const user = await this.userDao.findByQueryCriteria({ email });

    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AuthenticationError("Invalid email or password");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    }); // Adjust expiresIn as needed

    return token;
  }

  // Other complex business logics
};
