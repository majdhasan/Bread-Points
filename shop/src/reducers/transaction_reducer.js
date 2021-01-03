import {
  TRANSACTION_SAVED,
  TRANSACTION_RESET,
  TRANSACTION_FETCHED,
  TRANSACTION_FETCHING_FAILED,
  TRANSACTION_FETCHING,
} from '../actions/types';

const INITIAL_STATE = {
  saved: false,
  transactions: [],
  fetching: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTION_SAVED:
      return { ...state, saved: true };
    case TRANSACTION_RESET:
      return { ...state, saved: false };
    case TRANSACTION_FETCHED:
      return { ...state, fetching: false, transactions: action.payload };
    case TRANSACTION_FETCHING_FAILED:
      return { ...state, fetching: false };
    case TRANSACTION_FETCHING:
      return { ...state, fetching: true };
    default:
      return state;
  }
};

export default reducer;
