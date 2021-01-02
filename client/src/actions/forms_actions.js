import { OPEN_PAY_ORDER, CLOSE_PAY_ORDER, ADD_ERROR } from '../actions/types';

import { apiGetOrder } from '../api/order';

export const openPayOrdereForm = (orderId) => {
  return async (dispatch) => {
    try {
      const {
        data: { orders },
      } = await apiGetOrder(orderId);
      const order = orders.find((order) => {
        return order._id === orderId;
      });

      console.log(order);
      dispatch({ type: OPEN_PAY_ORDER, payload: order });
    } catch (e) {
      error(e);
    }
  };
};
export const closePayOrdereForm = () => {
  return { type: CLOSE_PAY_ORDER };
};

const error = (error) => {
  return { type: ADD_ERROR, payload: error };
};
