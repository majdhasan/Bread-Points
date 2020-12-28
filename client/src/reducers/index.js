import { combineReducers } from 'redux';
import auth from './auth_reducer';
import signup from './signup_reducer';
import transaction from './transaction_reducer';
import error from './error_reducer';

export default combineReducers({
  auth,
  signup,
  transaction,
  error,
});
