import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AddForm,
  TransactionList,
  OrderList,
  MonthSelector,
} from '../components';

import { fetchTransactions } from '../actions';

class HomeComponent extends Component {
  componentDidMount() {
    const { fetchTransactions } = this.props;
    fetchTransactions();
  }

  render() {
    return (
      <div>
        <h3 style={{ marginTop: 30 }}>Open Orders</h3>
        <hr />
        <OrderList />
        <h3 style={{ marginTop: 30 }}>Trnsactions</h3>
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

const Home = connect(mapStateToProps, { fetchTransactions })(HomeComponent);

export { Home };
