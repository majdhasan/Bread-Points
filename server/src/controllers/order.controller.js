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
  const { status } = req.query;

  const query = {
    customer: customer._id,
  };

  if (status) {
    query.status = status;
  }

  try {
    const orders = await Order.find(query).populate('shop').sort({
      issuedOn: 'desc',
    });

    return res.send({ orders });
  } catch (e) {
    next(e);
  }
};

orderController.getShopOrders = async (req, res, next) => {
  const { shop } = req;
  const { status, customer } = req.query;

  const query = {
    shop: shop._id,
  };

  try {
    if (status) {
      query.status = status;
    }

    if (customer) {
      const foundCustomer = await Customer.findOne({ _id: customer });
      foundCustomer && (query.customer = customer);
    }
    const orders = await Order.find(query).sort({
      issuedOn: 'desc',
    });

    return res.send({ orders });
  } catch (e) {
    next(e);
  }
};

module.exports = orderController;
