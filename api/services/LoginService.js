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

    let payload = { id: user._id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10s",
    }); // Adjust expiresIn as needed

    payload = { email: user.email };
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "8h",
    }); // Adjust expiresIn as needed

    return { accessToken, refreshToken };
  }

  async tryRefresh(req) {
    const cookie = req.cookies;
    if (!cookie.jwt) {
      throw new AuthenticationError("No refresh token provided");
    }
    const refreshToken = cookie.jwt;
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, user) => {
        if (err) {
          throw new AuthenticationError("Invalid refresh token");
        }

        const foundUser = await this.userDao.findByQueryCriteria({
          email: user.email,
        });

        if (!foundUser) {
          throw new AuthenticationError("Invalid refresh token");
        }

        const payload = { id: user._id, email: user.email };

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "10s",
        }); // Adjust expiresIn as needed

        return accessToken;
      }
    );
  }
  // Other complex business logics
};
