import {
  ORDER_SAVED,
  ORDER_RESET,
  ORDER_FETCHED,
  ORDER_FETCHING_FAILED,
  ORDER_FETCHING,
} from '../actions/types';

const INITIAL_STATE = {
  saved: false,
  orders: [],
  fetching: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_SAVED:
      return { ...state, saved: true };
    case ORDER_RESET:
      return { ...state, saved: false };
    case ORDER_FETCHED:
      return { ...state, fetching: false, orders: action.payload };
    case ORDER_FETCHING_FAILED:
      return { ...state, fetching: false };
    case ORDER_FETCHING:
      return { ...state, fetching: true };
    default:
      return state;
  }
};

export default reducer;
