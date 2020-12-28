import { SIGNUP_FAILED, SIGNUP_SUCCESS, SIGNUP_ATTEMPTING } from './types';
import { apiSignup } from '../api/customer';

export const signUp = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_ATTEMPTING });
    try {
      await apiSignup(reqData);
      dispatch({ type: SIGNUP_SUCCESS });
    } catch (e) {
      const {
        response: { data },
      } = e;
      dispatch(error(data.error));
    }
  };
};

const error = (error) => {
  return { type: SIGNUP_FAILED, payload: error };
};
