const jwt = require('jsonwebtoken');
const Shop = require('../models/shop.model');

const shopController = {};

/**
 * Sign up Logic
 */

shopController.register = async (req, res, next) => {
  const { name, email, password, joined } = req.body;

  const newShop = new Shop({
    name,
    email,
    password,
    joined,
  });

  try {
    const shop = await newShop.save();
    return res.send({ shop });
  } catch (e) {
    console.log(e);
    if (e.name === 'MongoError' && e.code === 11000) {
      next(new Error(`Shop name ${newShop.name} is already taken`));
    } else {
      next(e);
    }
  }
};

shopController.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const shop = await Shop.findOne({ email });
    if (!shop) {
      const err = new Error(`The email ${email} was not found in our system`);
      err.status = 401;
      return next(err);
    }
    shop.isPasswordMatch(password, shop.password, (err, matched) => {
      if (matched) {
        const secret = process.env.SECRET;
        const expire = process.env.EXPIRE;

        const token = jwt.sign({ _id: shop._id }, secret, {
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

shopController.me = async (req, res, next) => {
  const { shop } = req;
  res.send({ shop });
};

module.exports = shopController;
