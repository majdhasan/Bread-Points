const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model');
const customerController = {};
/**
 * Sign up Logic
 */

customerController.register = async (req, res, next) => {
  const { name, email, password, joined } = req.body;

  const newCustomer = new Customer({
    name,
    email,
    password,
    joined,
  });

  try {
    const customer = await newCustomer.save();
    return res.send({ customer });
  } catch (e) {
    console.log(e);
    if (e.name === 'MongoError' && e.code === 11000) {
      next(new Error(`Email address ${newCustomer.email} is already taken`));
    } else {
      next(e);
    }
  }
};

customerController.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      const err = new Error(`The email ${email} was not found in our system`);
      err.status = 401;
      return next(err);
    }
    customer.isPasswordMatch(password, customer.password, (err, matched) => {
      if (matched) {
        // return res.send("you may login");
        const secret = process.env.SECRET;
        const expire = process.env.EXPIRE;

        const token = jwt.sign({ _id: customer._id }, secret, {
          expiresIn: expire,
        });
        return res.send({ token });
      }
      res.status(401).send({ error: 'Invalid username/password combination' });
    });
  } catch (e) {
    next(e);
  }
};

customerController.me = async (req, res, next) => {
  const { customer } = req;
  res.send({ customer });
};

module.exports = customerController;
