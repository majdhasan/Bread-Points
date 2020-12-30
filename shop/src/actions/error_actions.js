import { CLEAR_ERRORS, ADD_ERROR } from './types';
import { apiSignup } from '../api/shop';

export const addErrorMessage = (e) => {
  const error = 'There was a problem, please try again';
  return { type: ADD_ERROR, payload: error };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
