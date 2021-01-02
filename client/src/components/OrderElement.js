import React from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';

import { openPayOrdereForm } from '../actions';

function OrderElementComponent({ order, openPayOrdereForm }) {
  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <span>
          <Badge color={order.status === 'paid' ? 'success' : 'primary'}>
            €{order.amount}
          </Badge>
        </span>
        <span className='shop-name'> {order.shop.name}</span>
        <h6 className='order-issuedate'>
          {moment(order.issuedOn).format('LL')}
        </h6>
      </div>
      <div className={'float-right'}>
        {order.status === 'pending' ? (
          <Button
            // onClick={handleSubmit}
            color='primary'
            onClick={() => {
              /**
               * @todo
               * connect redux here to open the pay order form.
               * and use order._id to find the right order from the database
               */
              openPayOrdereForm(order._id);
            }}
          >
            Pay
          </Button>
        ) : (
          <div>
            <i className='fas fa-check-circle paid-sign'></i>
          </div>
        )}
      </div>
    </ListGroupItem>
  );
}

const mapStateToProps = () => {
  return {};
};

const OrderElement = connect(mapStateToProps, { openPayOrdereForm })(
  OrderElementComponent,
);

export { OrderElement };
