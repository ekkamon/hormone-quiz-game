import {
  SET_USER,
  SET_USER_SCORE,
  SET_USER_HP,
  ADD_USER_LIFETIME,
} from '../types';

const initialState = {
  name: '',
  isLogin: false,
  score: 0,
  hp: 3,
  lifetime: 0,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        name: payload.name,
        isLogin: payload.isLogin,
      };
    case SET_USER_SCORE:
      return {
        ...state,
        score: payload,
      };
    case SET_USER_HP:
      return {
        ...state,
        hp: payload,
      };
    case ADD_USER_LIFETIME:
      return {
        ...state,
        lifetime: state.lifetime + 1,
      };
    default:
      return state;
  }
};

export default userReducer;
