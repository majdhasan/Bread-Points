import {
  ORDER_SAVED,
  ORDER_RESET,
  ORDER_FETCHING,
  ORDER_FETCHING_FAILED,
  ORDER_FETCHED,
  PAYING_ORDER,
  ORDER_PAID,
  ORDER_PAYING_FAILED,
  RESET_PAY_ORDER,
} from './types';

import { apiFetchOrders, apiPayOrder } from '../api/order';
import { addErrorMessage, clearErrors } from './error_actions';

export const resetTransactionState = () => {
  return (dispatch) => {
    dispatch({ type: ORDER_RESET });
  };
};
export const resetPayOrder = () => {
  return (dispatch) => {
    dispatch({ type: RESET_PAY_ORDER });
  };
};

export const fetchOrders = (status = '') => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_FETCHING });
      const {
        data: { orders },
      } = await apiFetchOrders(status);
      dispatch({ type: ORDER_FETCHED, payload: orders });
    } catch (e) {
      dispatch({ type: ORDER_FETCHING_FAILED });
      dispatch(addErrorMessage(e));
    }
  };
};

export const payOrder = (reqData) => {
  reqData.type = 'payment';
  return async (dispatch) => {
    try {
      dispatch({ type: PAYING_ORDER });
      console.log(reqData);
      const res = await apiPayOrder(reqData);
      dispatch({ type: ORDER_PAID });
      console.log(res);
    } catch (e) {
      console.log(e);
      dispatch({ type: ORDER_PAYING_FAILED });
      dispatch(addErrorMessage(e));
    }
  };
};
