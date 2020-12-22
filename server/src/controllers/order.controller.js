const Order = require('../models/order.model');

const orderController = {};

orderController.create = async (req, res, next) => {
  const { description, amount, customer } = req.body;
  const newOrder = new Order({
    description,
    amount,
    shop: req.shop._id,
    customer: customer,
  });
  try {
    const order = await newOrder.save();
    return res.send({ order });
  } catch (e) {
    next(e);
  }
};

orderController.get = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const err = new Error(
        `The order with id ${orderId} was not found in our system`,
      );
      err.status = 404;
      return next(err);
    }
    return res.send({ order });
  } catch (e) {
    next(e);
  }
};

module.exports = orderController;
