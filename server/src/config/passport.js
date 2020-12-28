const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Customer = require('../models/customer.model');
const Shop = require('../models/shop.model');

module.exports = (passport) => {
  let config = {};
  config.secretOrKey = process.env.SECRET;
  config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(
    'customer-local-rule',
    new JwtStrategy(config, async (jwtPayload, done) => {
      try {
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

  passport.use(
    'shop-local-rule',
    new JwtStrategy(config, async (jwtPayload, done) => {
      try {
        const shop = await Shop.findById(jwtPayload._id);
        if (shop) {
          return done(null, shop);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
