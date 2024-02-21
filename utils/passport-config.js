const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../api/schemas/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    // Find user by ID from JWT payload
    const user = await User.findById(jwt_payload.id);
    if (user) return done(null, user); // User found
    return done(null, false); // User not found
  })
);

module.exports = passport;
