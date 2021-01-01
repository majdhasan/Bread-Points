import {
  OPEN_CHARGE_BALANCE,
  CLOSE_CHARGE_BALANCE,
  OPEN_CREATE_ORDER,
  CLOSE_CREATE_ORDER,
} from '../actions/types';

const INITIAL_STATE = {
  createOrderModal: false,
  chargeBalanceModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CHARGE_BALANCE:
      return { ...state, chargeBalanceModal: true, createOrderModal: false };
    case CLOSE_CHARGE_BALANCE:
      return { ...state, chargeBalanceModal: false };
    case OPEN_CREATE_ORDER:
      return { ...state, chargeBalanceModal: false, createOrderModal: true };
    case CLOSE_CREATE_ORDER:
      return { ...state, createOrderModal: false };
    default:
      return state;
  }
};
