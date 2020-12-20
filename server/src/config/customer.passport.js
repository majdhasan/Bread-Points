const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Customer = require('../models/customer.model');

module.exports = (passport) => {
  let config = {};
  config.secretOrKey = process.env.SECRET;
  config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(
    'customer-rule',
    new JwtStrategy(config, async (jwtPayload, done) => {
      try {
        console.log('entered');
        const customer = await Customer.findById(jwtPayload._id);
        if (customer) {
          return done(null, customer);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
