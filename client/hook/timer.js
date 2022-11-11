import { useDispatch, useSelector } from 'react-redux';
import {
  setTimerData,
  addTimerData,
  delTimerData,
} from '../store/actions/timerAction';

export const useTimer = () => {
  const dispatch = useDispatch();

  return {
    ...useSelector((state) => state.timerData),
    setTimer: (payload) => dispatch(setTimerData(payload)),
    addTimer: () => dispatch(addTimerData()),
    delTimer: () => dispatch(delTimerData()),
  };
};
