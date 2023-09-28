import {combineReducers} from 'redux';
import authReducer from '@modules/auth.ts';

const rootReducer = combineReducers({
  authReducer
});
export default rootReducer;