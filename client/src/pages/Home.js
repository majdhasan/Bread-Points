import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AddForm,
  TransactionList,
  OrderList,
  MonthSelector,
  BalanceList,
} from '../components';

import { fetchTransactions, fetchOrders } from '../actions';

class HomeComponent extends Component {
  componentDidMount() {
    const { fetchTransactions, fetchOrders } = this.props;

    fetchTransactions();
    fetchOrders();
  }

  render() {
    return (
      <div>
        <h3 style={{ marginTop: 30 }}>Balances</h3>
        <hr />
        <BalanceList />
        <h3 style={{ marginTop: 30 }}>Orders</h3>
        <hr />
        <OrderList />
        <h3 style={{ marginTop: 30 }}>Transactions</h3>
        <MonthSelector selected={new Date().getMonth()} />
        <hr />
        <TransactionList />
        <AddForm />
      </div>
    );
  }
}

const mapStateToProps = ({ transaction, order }) => {
  return {
    transactions: transaction.transactions,
    orders: order.orders,
  };
};

const Home = connect(mapStateToProps, { fetchTransactions, fetchOrders })(
  HomeComponent,
);

export { Home };
