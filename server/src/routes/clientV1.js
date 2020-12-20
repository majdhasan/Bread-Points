const express = require('express');
const router = express.Router();
const passport = require('passport');

// -------------------- Public Routes ----------//

// router.post("/register", userController.register);
// router.post("/auth", userController.login);

// ------------ Unfound Route Handler ----------//
router.all('*', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error('You are not authorized to access this path');
      error.status = 401;
      throw error;
    }
    req.user = user;
    return next();
  })(req, res, next);
});

// -------------------- Restricted Routes ----------//

module.exports = router;
