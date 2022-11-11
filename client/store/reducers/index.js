import { combineReducers } from 'redux';
import userReducer from './userReducer';
import timerReducer from './timerReducer';

export default combineReducers({
  userData: userReducer,
  timerData: timerReducer,
});
