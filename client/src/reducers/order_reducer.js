import {
  ORDER_SAVED,
  ORDER_RESET,
  ORDER_FETCHED,
  ORDER_FETCHING_FAILED,
  ORDER_FETCHING,
  PAYING_ORDER,
  ORDER_PAID,
  ORDER_PAYING_FAILED,
  RESET_PAY_ORDER,
} from '../actions/types';

const INITIAL_STATE = {
  orders: [],
  fetching: false,
  paying: false,
  paid: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_RESET:
      return { ...state, saved: false };
    case ORDER_FETCHED:
      return { ...state, fetching: false, orders: action.payload };
    case ORDER_FETCHING_FAILED:
      return { ...state, fetching: false };
    case ORDER_FETCHING:
      return { ...state, fetching: true };
    case PAYING_ORDER:
      return { ...state, paying: true };
    case ORDER_PAID:
      return { ...state, paid: true, paying: false };
    case RESET_PAY_ORDER:
      return { ...state, paid: false, paying: false };
    default:
      return state;
  }
};
