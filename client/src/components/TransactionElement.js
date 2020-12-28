import React from 'react';
import { ListGroupItem, Badge } from 'reactstrap';
import moment from 'moment';

function TransactionElement({ transaction }) {
  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <span style={{ marginRight: 15 }}>{transaction.description}</span>
        <Badge color='secondary'>€{transaction.amount}</Badge>
        <div>{moment(transaction.date).format('LL')}</div>
      </div>
      <div className={'float-right'}>{transaction.amount}</div>
    </ListGroupItem>
  );
}

export { TransactionElement };
