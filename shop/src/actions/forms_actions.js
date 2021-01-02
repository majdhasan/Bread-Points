import {
  OPEN_CHARGE_BALANCE,
  CLOSE_CHARGE_BALANCE,
  OPEN_CREATE_ORDER,
  CLOSE_CREATE_ORDER,
  CHARGING_BALANCE,
  BALANCE_CHARGED,
  CHARGING_FAILED,
} from '../actions/types';
import { apiChargeBalance } from '../api/balance';

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

export const chargeBalance = (reqData) => {
  reqData.type = 'charge';
  return async (dispatch) => {
    dispatch({ type: CHARGING_BALANCE });
    try {
      await apiChargeBalance(reqData);
      dispatch({ type: BALANCE_CHARGED });
    } catch (e) {
      console.log(e);
      const {
        response: { data },
      } = e;
      dispatch(error(data.error));
    }
  };
};

const error = (error) => {
  return { type: CHARGING_FAILED, payload: error };
};
