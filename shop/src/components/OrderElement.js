import React from 'react';
import { ListGroupItem, Badge } from 'reactstrap';
import moment from 'moment';

function OrderElement({ order }) {
  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <Badge color={order.status == 'paid' ? 'success' : 'primary'}>
          €{order.amount}
        </Badge>
        <div>{moment(order.issuedOn).format('LLLL')}</div>
      </div>
      <div className={'float-right'}>{order.status}</div>
    </ListGroupItem>
  );
}

export { OrderElement };
