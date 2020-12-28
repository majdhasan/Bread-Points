import {
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_ATTEMPTING,
  CUSTOMER_LOGGED_OUT,
  PROFILE_FETCHED,
} from './types';
import { apiLogin, getProfile } from '../api/customer';
import setAuthHeader from '../api/setAuthHeader';
const TOKEN_NAME = 'cost_planner_token';

export const signIn = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_ATTEMPTING });
    try {
      const {
        data: { token },
      } = await apiLogin(reqData);
      setAuthHeader(token);
      dispatch(fetchProfile());
      dispatch(setTokeninLocalStorage(token));
    } catch (e) {
      const {
        response: { data },
      } = e;
      dispatch(error(data.error));
    }
  };
};

export const onLoadingSignin = () => {
  return (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (token === null || token === 'undefined') {
        return dispatch(error('You need to login'));
      }
      setAuthHeader(token);
      dispatch(fetchProfile());
      dispatch(setTokeninLocalStorage(token));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const {
        data: { customer },
      } = await getProfile();
      dispatch({ type: PROFILE_FETCHED, payload: customer });
    } catch (e) {
      console.error(e);
    }
  };
};

export const logCustomerOut = () => {
  localStorage.clear();
  return { type: CUSTOMER_LOGGED_OUT };
};

const setTokeninLocalStorage = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
  return { type: AUTH_SUCCESS };
};

const error = (error) => {
  return { type: AUTH_FAILED, payload: error };
};
