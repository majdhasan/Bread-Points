import { OPEN_PAY_ORDER, CLOSE_PAY_ORDER } from '../actions/types';

const INITIAL_STATE = {
  orderDetails: {},
  payOrdereModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_PAY_ORDER:
      return {
        ...state,
        payOrdereModal: true,
        orderDetails: action.payload,
      };
    case CLOSE_PAY_ORDER:
      return { ...state, payOrdereModal: false };
    default:
      return state;
  }
};
