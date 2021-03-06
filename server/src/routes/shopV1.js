const express = require('express');
const router = express.Router();
const passport = require('passport');
const shopController = require('../controllers/shop.controller');
const orderController = require('../controllers/order.controller');
const transactionController = require('../controllers/transaction.controller');

// -------------------- Public Routes ----------//

router.post('/register', shopController.register);
router.post('/auth', shopController.login);

// ------------ Restricted Route Handler ----------//
router.all('*', (req, res, next) => {
  passport.authenticate('shop-local-rule', { session: false }, (err, shop) => {
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

router.post('/order', orderController.create);
router.get('/order', orderController.getShopOrders);

router.post('/transaction', transactionController.create);
router.get('/transaction', transactionController.getShopTransactions);

module.exports = router;
