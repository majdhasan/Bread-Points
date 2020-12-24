/**
 * @author Majd Hasan
 */

const Transaction = require('../models/transaction.model');
const Customer = require('../models/customer.model');
const Shop = require('../models/shop.model');

const transactionController = {};

transactionController.create = async (req, res, next) => {
  /**
   * @description:
   *
   * In this section we are going to handle the creation of a new transaction
   * There are 3 types of Transactions:
   * 1- Charge: in this type the issuer is a shop that wants to charge balance for a customer
   * 2- Payment: in the type the issuer is a customer, that wants to pay an open order
   * 3- reimbursment: in this type the issuer is a shop that will give back part or all of the balance of a customer back
   *                  to the customer in cash
   */
  const { amount, order, receiverId, type } = req.body;
  const transactionMembersDetails = {};

  if (typeof req.shop === 'undefined') {
    // Transaction issuer is a customer
    transactionMembersDetails.issuer = req.customer._id;
    transactionMembersDetails.issuerModel = 'Customer';
    transactionMembersDetails.receiver = receiverId;
    transactionMembersDetails.receiverModel = 'Shop';
  } else {
    // Transaction issuer is a shop
    transactionMembersDetails.issuer = req.shop._id;
    transactionMembersDetails.issuerModel = 'Shop';
    transactionMembersDetails.receiver = receiverId;
    transactionMembersDetails.receiverModel = 'Customer';
  }

  const newTransacation = new Transaction({
    amount,
    type,
    order,
    ...transactionMembersDetails,
  });

  try {
    switch (type) {
      case 'charge':
        /**
         * find receiver and create transaction
         * add transaction to shop and customer profiles
         * and update customer balance
         */

        const user = await Customer.findOne({ _id: receiverId });
        if (user) {
          const transaction = await newTransacation.save();
          user.transactions.push(transaction);
          user.balance += parseFloat(amount);
          user.save();
          const shop = await Shop.findOne({ _id: req.shop._id });
          console.log(shop);
          shop.transactions.push(transaction);
          shop.save();
          return res.send({ transaction });
        } else {
          const err = new Error(
            `The receiver with id ${receiverId} was not found in our system`,
          );
          err.status = 404;
          return next(err);
        }

      case 'reimbursement':
        break;
      case 'payment':
        /**
         * decrease customer balance
         * decrease order open amount
         * eventually mark order as paid
         *
         *
         */

        break;

      default:
        break;
    }
  } catch (e) {
    next(e);
  }
};

// transactionController.update = async (req, res, next) => {
//   const { orderId } = req.body;

//   try {
//     const order = await Order.findById(orderId);
//     const order = await order.save();
//     return res.send({ order });
//   } catch (e) {
//     next(e);
//   }
// };

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

module.exports = transactionController;
