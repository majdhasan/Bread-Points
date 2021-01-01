import {
  OPEN_CHARGE_BALANCE,
  CLOSE_CHARGE_BALANCE,
  OPEN_CREATE_ORDER,
  CLOSE_CREATE_ORDER,
} from '../actions/types';

export const openAddOrderForm = () => {
  return { type: OPEN_CREATE_ORDER };
};
export const closeAddOrderForm = () => {
  return { type: CLOSE_CREATE_ORDER };
};
export const openChargeBalanceForm = () => {
  return { type: OPEN_CHARGE_BALANCE };
};
export const closeChargeBalanceForm = () => {
  return { type: CLOSE_CHARGE_BALANCE };
};
