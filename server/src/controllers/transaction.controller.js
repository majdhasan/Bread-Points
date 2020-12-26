/**
 * @author Majd Hasan
 *
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
        return res.send(chargeCreditToCustomerResponse);

      case 'reimbursement':
        break;

      case 'payment':
        transactionMembersDetails.issuer = req.customer._id;
        transactionMembersDetails.issuerModel = 'Customer';

        const payOrderResponse = await payOrder(
          transactionMembersDetails,
          orderId,
          amount,
        );
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

transactionController.get = async (req, res, next) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transaction);
    if (!transaction) {
      const err = new Error(
        `The transaction with id ${transactionId} was not found in our system`,
      );
      err.status = 404;
      return next(err);
    }
    return res.send({ transaction });
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
    customer.transactions.push(transaction);
    shop.transactions.push(transaction);
    if (customer.balance.has(shop.name)) {
      const oldBalance = customer.balance.get(shop.name);
      const newBalance = oldBalance + amount;
      customer.balance.set(shop.name, newBalance);
    } else {
      customer.balance.set(shop.name, amount);
    }

    await customer.save();
    await shop.save();
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

    if (amount > order.openAmount) {
      amount = order.openAmount;
      message =
        'The given amount is bigger than the open amount of the order, therfore the amount of the transaction has been modified';
    }
    const currentCustomerBalance = customer.balance.get(shop.name);
    if (
      !currentCustomerBalance ||
      (currentCustomerBalance && currentCustomerBalance < amount)
    ) {
      const err = new Error(
        `Your current balance at ${shop.name} is too low to complete the transaction.`,
      );
      err.status = 400;
      return next(err);
    }
    order.openAmount -= amount;
    if (order.openAmount === 0) {
      order.status = 'paid';
      order.paidOn = new Date();
    }

    customer.balance.set(shop.name, currentCustomerBalance - amount);

    const newTransacation = new Transaction({
      amount,
      type: 'payment',
      orderId,
      ...transactionMembersDetails,
    });
    const transaction = await newTransacation.save();
    order.transactions.push(transaction);
    customer.transactions.push(transaction);
    shop.transactions.push(transaction);
    await customer.save();
    await shop.save();
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
