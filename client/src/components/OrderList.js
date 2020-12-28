import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import { Spinner, TransactionElement } from '.';

function OrderListComponent({ transactions, fetching }) {
  return (
    <div>
      {fetching && <Spinner />}

      <ListGroup>
        {transactions &&
          transactions.map((transaction) => {
            return (
              <TransactionElement
                key={transaction._id}
                transaction={transaction}
              />
            );
          })}
      </ListGroup>
    </div>
  );
}

const mapStateToProps = ({ transaction }) => {
  return {
    transactions: transaction.transactions,
    fetching: transaction.fetching,
  };
};

const OrderList = connect(mapStateToProps)(OrderListComponent);

export { OrderList };
