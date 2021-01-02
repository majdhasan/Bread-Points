import {
  TRANSACTION_SAVED,
  TRANSACTION_RESET,
  TRANSACTION_FETCHING,
  TRANSACTION_FETCHING_FAILED,
  TRANSACTION_FETCHED,
} from './types';
import { apiAddTransaction, apiFetchTransactions } from '../api/transaction';
import { addErrorMessage, clearErrors } from './error_actions';

export const saveTransaction = (transaction) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      await apiAddTransaction(transaction);
      dispatch({ type: TRANSACTION_SAVED });
    } catch (e) {
      dispatch(addErrorMessage(e));
    }
  };
};

export const resetTransactionState = () => {
  return (dispatch) => {
    dispatch({ type: TRANSACTION_RESET });
  };
};

export const fetchTransactions = (month = 12) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TRANSACTION_FETCHING });
      const {
        data: { results },
      } = await apiFetchTransactions(month);
      dispatch({ type: TRANSACTION_FETCHED, payload: results });
    } catch (e) {
      dispatch({ type: TRANSACTION_FETCHING_FAILED });
      dispatch(addErrorMessage(e));
    }
  };
};
