const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const UserService = require("../api/services/UserService");
const userService = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    // Find user by ID from JWT payload
    const user = await userService.findById(jwt_payload.id);
    if (user) return done(null, user); // User found
    return done(null, false); // User not found
  })
);

module.exports = passport;
