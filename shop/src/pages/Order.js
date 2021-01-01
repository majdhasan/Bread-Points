import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CreateOrderForm,
  TransactionList,
  OrderList,
  MonthSelector,
} from '../components';

import { fetchTransactions, fetchOrders } from '../actions';

class OrderComponent extends Component {
  componentDidMount() {
    const { fetchTransactions, fetchOrders } = this.props;
    fetchTransactions();
    fetchOrders();
  }

  render() {
    return (
      <div>
        <h3 style={{ marginTop: 30 }}>Order Details</h3>
        <hr />

        <h3 style={{ marginTop: 30 }}>Transactions</h3>
        <MonthSelector selected={new Date().getMonth()} />

        <hr />
        <TransactionList />
        <CreateOrderForm />
      </div>
    );
  }
}

const mapStateToProps = ({ transaction }) => {
  return {
    transactions: transaction.transactions,
  };
};

const Order = connect(mapStateToProps, { fetchTransactions, fetchOrders })(
  OrderComponent,
);

export { Order };
