import React from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap';
import moment from 'moment';

function OrderElement({ order }) {
  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <span>
          <Badge color={order.status == 'paid' ? 'success' : 'primary'}> €{order.amount} </Badge>
        </span>
        <span className="shop-name"> {order.shop.name}</span>
        <h6 className="order-issuedate">{moment(order.issuedOn).format('LL')}</h6>
      </div>
      <div className={'float-right'}>
        {
          order.status === 'pending' ?
            < Button
              // onClick={handleSubmit}
              color='primary'
            >
              Pay
        </ Button >
            :
            <div><i className="fas fa-check-circle paid-sign"></i></div>
        }
      </div>
    </ListGroupItem >
  );
}

export { OrderElement };


