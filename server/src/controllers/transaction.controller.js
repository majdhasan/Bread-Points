/**
 * @author Majd Hasan
 * @todo finish the get method for a customer with a specific month
 */

const Transaction = require('../models/transaction.model');
const Customer = require('../models/customer.model');
const Shop = require('../models/shop.model');
const Order = require('../models/order.model');

const transactionController = {};

/**
 * @description:
 *
 * In this section we are going to handle the creation of a new transaction
 * There are 3 types of Transactions:
 * 1- Charge: in this type the issuer is a shop that wants to charge balance for a customer
 * 2- Payment: in the type the issuer is a customer, that wants to pay an open order
 * 3- Reimbursment: in this type the issuer is a shop that will give back part or all of the balance of a customer back
 *                  to the customer in cash
 */
transactionController.create = async (req, res, next) => {
  const { orderId, customerId, type } = req.body;
  const amount = parseFloat(req.body.amount);
  const transactionMembersDetails = {};

  try {
    switch (type) {
      case 'charge':
        transactionMembersDetails.issuer = req.shop._id;
        transactionMembersDetails.issuerModel = 'Shop';
        transactionMembersDetails.receiver = customerId;
        transactionMembersDetails.receiverModel = 'Customer';

        const chargeCreditToCustomerResponse = await chargeCreditToCustomer(
          transactionMembersDetails,
          amount,
        );

        if (chargeCreditToCustomerResponse instanceof Error) {
          return next(chargeCreditToCustomerResponse);
        }
        return res.send(chargeCreditToCustomerResponse);

      case 'reimbursement':
        break;

      case 'payment':
        transactionMembersDetails.issuer = req.customer._id;
        transactionMembersDetails.issuerModel = 'Customer';
        console.log(transactionMembersDetails);
        console.log(req.body);

        const payOrderResponse = await payOrder(
          transactionMembersDetails,
          orderId,
          amount,
        );
        if (payOrderResponse instanceof Error) {
          return next(payOrderResponse);
        }
        return res.send(payOrderResponse);

      default:
        /**
         * handle wrong transaction type
         */
        const err = new Error(`The Transaction Type: ${type} is not supported`);
        err.status = 404;
        return next(err);
    }
  } catch (e) {
    next(e);
  }
};

transactionController.getCustomerTransactions = async (req, res, next) => {
  const { customer } = req;

  const query = {
    issuer: customer._id,

    // created: {
    //   $gte: firstDay,
    //   $lt: lastDay,
    // },
  };

  try {
    const transactions = await Transaction.find(query).sort({
      created: 'desc',
    });

    // const transaction = await Transaction.findById(transaction);

    return res.send({ transactions });
  } catch (e) {
    next(e);
  }
};

transactionController.getShopTransactions = async (req, res, next) => {
  const { shop } = req;

  const query = {
    issuer: shop._id,
    // created: {
    //   $gte: firstDay,
    //   $lt: lastDay,
    // },
  };

  try {
    const transactions = await Transaction.find(query).sort({
      created: 'desc',
    });

    // const transaction = await Transaction.findById(transaction);

    return res.send({ transactions });
  } catch (e) {
    next(e);
  }
};

const chargeCreditToCustomer = async (transactionMembersDetails, amount) => {
  /**
   * find receiver and create transaction
   * add transaction to shop and customer profiles
   * and update customer balance
   */

  const newTransacation = new Transaction({
    amount,
    type: 'charge',
    ...transactionMembersDetails,
  });

  const customer = await Customer.findOne({
    _id: transactionMembersDetails.receiver,
  });
  const shop = await Shop.findOne({ _id: transactionMembersDetails.issuer });

  if (customer && shop) {
    const transaction = await newTransacation.save();

    const foundBalanceIndex = customer.balances.findIndex((balance) => {
      return balance.shop.toString() == transactionMembersDetails.issuer;
    });

    if (typeof foundBalanceIndex !== 'undefined' && foundBalanceIndex !== -1) {
      customer.balances[foundBalanceIndex].amount =
        customer.balances[foundBalanceIndex].amount + amount;
    } else {
      const newBalance = { shop, amount };
      customer.balances.push(newBalance);
    }

    await customer.save();

    const message = `${customer.name} balance from ${shop.name} has been charged with an amount of ${amount}`;
    return { message, transaction };
  } else {
    const err = new Error(
      'The given amount is bigger than the open amount of the order, therfore the transaction has been modified',
    );
    err.status = 404;
    return err;
  }
};

const payOrder = async (transactionMembersDetails, orderId, amount) => {
  /**
   * decrease customer balance
   * decrease order open amount
   * eventually mark order as paid
   *
   *
   */

  const order = await Order.findOne({ _id: orderId });
  const customer = await Customer.findOne({
    _id: transactionMembersDetails.issuer,
  });

  const shop = await Shop.findOne({ _id: order.shop });

  const message = '';
  if (order && customer && shop) {
    transactionMembersDetails.receiver = order.shop;
    transactionMembersDetails.receiverModel = 'Shop';
    console.log('transactionMembersDetails', transactionMembersDetails);
    if (amount > order.openAmount) {
      amount = order.openAmount;
      message =
        'The given amount is bigger than the open amount of the order, therfore the amount of the transaction has been modified';
    }

    const foundBalanceIndex = customer.balances.findIndex((balance) => {
      return balance.shop.toString() == transactionMembersDetails.receiver;
    });

    if (
      typeof foundBalanceIndex !== 'undefined' &&
      foundBalanceIndex !== -1 &&
      customer.balances[foundBalanceIndex].amount >= amount
    ) {
      customer.balances[foundBalanceIndex].amount -= amount;
    } else {
      const err = new Error(
        `Your current balance at ${shop.name} is too low to complete the transaction.`,
      );
      err.status = 400;
      return err;
    }

    order.openAmount -= amount;
    if (order.openAmount === 0) {
      order.status = 'paid';
      order.paidOn = new Date();
    }

    const newTransacation = new Transaction({
      amount,
      type: 'payment',
      orderId,
      ...transactionMembersDetails,
    });
    const transaction = await newTransacation.save();
    await customer.save();
    await order.save();
    return { message, transaction };
  } else {
    const err = new Error(
      `The entered data is not correct, please check the data again.`,
    );
    err.status = 404;
    return err;
  }
};

module.exports = transactionController;
