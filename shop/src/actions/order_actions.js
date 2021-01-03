import {
  ORDER_SAVED,
  ORDER_RESET,
  ORDER_FETCHING,
  ORDER_FETCHING_FAILED,
  ORDER_FETCHED,
} from './types';
import { apiFetchOrders, apiAddOrder } from '../api/order';
import { addErrorMessage, clearErrors } from './error_actions';

export const saveOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      await apiAddOrder(order);
      dispatch({ type: ORDER_SAVED });
    } catch (e) {
      dispatch(addErrorMessage(e));
    }
  };
};

export const resetOrderState = () => {
  return (dispatch) => {
    dispatch({ type: ORDER_RESET });
  };
};
export const fetchOrders = (filters = {}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_FETCHING });
      const {
        data: { orders },
      } = await apiFetchOrders(filters);
      dispatch({ type: ORDER_FETCHED, payload: orders });
    } catch (e) {
      dispatch({ type: ORDER_FETCHING_FAILED });
      dispatch(addErrorMessage(e));
    }
  };
};
