import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CreateOrderForm,
  TransactionList,
  OrderList,
  MonthSelector,
  FloatingButton,
} from '../components';

import { fetchTransactions, fetchOrders } from '../actions';
import { ChargeBalanceForm } from '../components/ChargeBalanceForm';

class HomeComponent extends Component {
  componentDidMount() {
    const { fetchTransactions, fetchOrders } = this.props;
    fetchTransactions();
    fetchOrders();
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <h4 style={{ marginTop: 30 }}>Shop name: {profile.name}</h4>
        <h4 style={{ marginTop: 10 }}>Shop id: {profile._id}</h4>

        <h3 style={{ marginTop: 30 }}>Orders</h3>
        <hr />
        <OrderList />
        <h3 style={{ marginTop: 30 }}>Transactions</h3>
        <MonthSelector selected={new Date().getMonth()} />

        <hr />
        <TransactionList />
        <CreateOrderForm />
        <ChargeBalanceForm />
        <FloatingButton />
      </div>
    );
  }
}

const mapStateToProps = ({ transaction, auth }) => {
  return {
    profile: auth.profile,
    transactions: transaction.transactions,
  };
};

const Home = connect(mapStateToProps, { fetchTransactions, fetchOrders })(
  HomeComponent,
);

export { Home };
