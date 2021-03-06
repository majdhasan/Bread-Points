const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const Shop = require('../models/shop.model');

const orderController = {};

orderController.create = async (req, res, next) => {
  const { description, amount, customerId } = req.body;
  const shopId = req.shop._id;

  const newOrder = new Order({
    customer: customerId,
    description,
    amount,
    openAmount: amount,
    shop: shopId,
  });

  try {
    const customer = await Customer.findOne({ _id: customerId });
    const shop = await Shop.findOne({ _id: shopId });

    const order = await newOrder.save();
    customer.orders.push(order);
    shop.orders.push(order);
    await shop.save();

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

orderController.getCustomerOrders = async (req, res, next) => {
  const { customer } = req;
  const { status } = req.params;

  const query = {
    customer: customer._id,
    // created: {
    //   $gte: firstDay,
    //   $lt: lastDay,
    // },
  };

  if (status) {
    query.status = status;
  }

  try {
    const orders = await Order.find(query).populate('shop').sort({
      created: 'desc',
    });

    return res.send({ orders });
  } catch (e) {
    next(e);
  }
};

orderController.getShopOrders = async (req, res, next) => {
  const { shop } = req;
  const { status } = req.params;

  const query = {
    shop: shop._id,
    // created: {
    //   $gte: firstDay,
    //   $lt: lastDay,
    // },
  };

  if (status) {
    query.status = status;
  }

  try {
    const orders = await Order.find(query).sort({
      created: 'desc',
    });

    return res.send({ orders });
  } catch (e) {
    next(e);
  }
};

module.exports = orderController;
