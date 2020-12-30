import {
  ORDER_SAVED,
  ORDER_RESET,
  ORDER_FETCHING,
  ORDER_FETCHING_FAILED,
  ORDER_FETCHED,
} from './types';
import { apiFetchOrders } from '../api/order';
import { addErrorMessage, clearErrors } from './error_actions';

// export const saveTransaction = (transaction) => {
//   return async (dispatch) => {
//     try {
//       dispatch(clearErrors());
//       await apiAddTransaction(transaction);
//       dispatch({ type: ORDER_SAVED });
//     } catch (e) {
//       dispatch(addErrorMessage(e));
//     }
//   };
// };

export const resetTransactionState = () => {
  return (dispatch) => {
    dispatch({ type: ORDER_RESET });
  };
};
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_FETCHING });
      const {
        data: { orders },
      } = await apiFetchOrders();
      console.log(orders);
      dispatch({ type: ORDER_FETCHED, payload: orders });
    } catch (e) {
      dispatch({ type: ORDER_FETCHING_FAILED });
      dispatch(addErrorMessage(e));
    }
  };
};
