import { CLEAR_ERRORS, ADD_ERROR } from './types';

export const addErrorMessage = (e) => {
  const error = e.message;
  return { type: ADD_ERROR, payload: error };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
