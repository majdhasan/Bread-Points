import { CLEAR_ERRORS, ADD_ERROR } from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.payload };
    case CLEAR_ERRORS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
