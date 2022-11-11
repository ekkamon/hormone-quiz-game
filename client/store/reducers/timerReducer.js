import { ADD_TIMER, DEL_TIMER, SET_TIMER } from '../types';

const initialState = {
  value: 60 * 3,
};

const timerRedcuer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TIMER:
      return {
        ...state,
        value: payload,
      };
    case ADD_TIMER:
      return {
        ...state,
        value: state.value + 1,
      };

    case DEL_TIMER:
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

export default timerRedcuer;
