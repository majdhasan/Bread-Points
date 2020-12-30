import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AddForm,
  TransactionList,
  OrderList,
  MonthSelector,
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
        <h3 style={{ marginTop: 30 }}>Open Orders</h3>
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

const mapStateToProps = ({ transaction }) => {
  return {
    transactions: transaction.transactions,
  };
};

const Home = connect(mapStateToProps, { fetchTransactions, fetchOrders })(
  HomeComponent,
);

export { Home };
