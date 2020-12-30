import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import { Spinner, OrderElement } from '.';

function OrderListComponent({ orders, fetching }) {
  return (
    <div>
      {fetching && <Spinner />}

      <ListGroup>
        {orders &&
          orders.map((order) => {
            return <OrderElement key={order._id} order={order} />;
          })}
      </ListGroup>
    </div>
  );
}

const mapStateToProps = ({ order }) => {
  return {
    orders: order.orders,
    fetching: order.fetching,
  };
};

const OrderList = connect(mapStateToProps)(OrderListComponent);

export { OrderList };
