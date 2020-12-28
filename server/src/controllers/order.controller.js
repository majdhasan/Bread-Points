const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const Shop = require('../models/shop.model');

const orderController = {};

orderController.create = async (req, res, next) => {
  const { description, amount, customerId } = req.body;
  const shopId = req.shop._id;

  const newOrder = new Order({
    description,
    amount,
    openAmount: amount,
    shop: shopId,
    customer: customerId,
  });
  try {
    const customer = await Customer.findOne({ _id: customerId });
    const shop = await Shop.findOne({ _id: shopId });
    console.log('customer', customer);
    console.log('shop', shop);

    if (customer && shop) {
      const order = await newOrder.save();
      customer.orders.push(order);
      shop.orders.push(order);
      await customer.save();
      await shop.save();

      return res.send({ order });
    } else {
      const err = new Error(
        `The Customer with id ${customerId} was not found in our system`,
      );
      err.status = 404;
      return next(err);
    }
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

  const query = {
    customer: customer._id,
    // created: {
    //   $gte: firstDay,
    //   $lt: lastDay,
    // },
  };

  try {
    const orders = await Order.find(query).sort({
      created: 'desc',
    });

    if (!orders) {
      const err = new Error(
        `The order with id ${orderId} was not found in our system`,
      );
      err.status = 404;
      return next(err);
    }
    return res.send({ orders });
  } catch (e) {
    next(e);
  }
};

orderController.getShopOrders = async (req, res, next) => {
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
