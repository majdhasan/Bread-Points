const express = require('express');
const router = express.Router();
const passport = require('passport');

const customerController = require('../controllers/customer.controller');
const transactionController = require('../controllers/transaction.controller');

// -------------------- Public Routes ----------//

router.post('/register', customerController.register);
router.post('/auth', customerController.login);

// ------------ Restricted Route Handler ----------//
router.all('*', (req, res, next) => {
  passport.authenticate(
    'customer-local-rule',
    { session: false },
    (err, customer) => {
      if (err || !customer) {
        const error = new Error('You are not authorized to access this path');
        error.status = 401;
        next(error);
      }
      req.customer = customer;
      return next();
    },
  )(req, res, next);
});

// -------------------- Restricted Routes ----------//
router.get('/me', customerController.me);

router.post('/transaction', transactionController.create);
router.get('/me', customerController.me);

module.exports = router;
