const express = require('express');
const router = express.Router();
const passport = require('passport');
const shopController = require('../controllers/shop.controller');

// -------------------- Public Routes ----------//

router.post('/register', shopController.register);
router.post('/auth', shopController.login);

// ------------ Unfound Route Handler ----------//
router.all('*', (req, res, next) => {
  passport.authenticate('shop-rule', { session: false }, (err, shop) => {
    if (err || !shop) {
      const error = new Error('You are not authorized to access this path');
      error.status = 401;
      next(error);
    }
    req.shop = shop;
    return next();
  })(req, res, next);
});

// -------------------- Restricted Routes ----------//
router.get('/me', shopController.me);

module.exports = router;
