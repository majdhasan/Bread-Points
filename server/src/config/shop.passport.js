const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Shop = require('../models/shop.model');

module.exports = (passport) => {
  let config = {};
  config.secretOrKey = process.env.SECRET;
  config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(
    'shop-rule',
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
