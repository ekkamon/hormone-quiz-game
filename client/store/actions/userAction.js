import {
  SET_USER,
  SET_USER_SCORE,
  SET_USER_HP,
  ADD_USER_LIFETIME,
} from '../types';

export const setUserData = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: {
      name: payload.name,
      isLogin: payload.isLogin,
    },
  });
};

export const setUserScoreData = (score) => (dispatch) => {
  dispatch({
    type: SET_USER_SCORE,
    payload: score,
  });
};

export const setUserHPData = (hp) => (dispatch) => {
  dispatch({
    type: SET_USER_HP,
    payload: hp,
  });
};
