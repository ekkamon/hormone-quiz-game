import { ADD_TIMER, DEL_TIMER, SET_TIMER } from '../types';

export const setTimerData = (time) => (dispatch) => {
  dispatch({
    type: SET_TIMER,
    payload: time,
  });
};

export const addTimerData = () => (dispatch) => {
  dispatch({
    type: ADD_TIMER,
  });
};

export const delTimerData = () => (dispatch) => {
  dispatch({
    type: DEL_TIMER,
  });
};
