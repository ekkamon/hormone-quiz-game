import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserData,
  setUserScoreData,
  setUserHPData,
} from '../store/actions/userAction';

export const useIsUserLoggedIn = () => {
  const user = useSelector((state) => state.userData);

  useEffect(() => {
    if (!user?.isLogin) {
      location.href = '/';
    }
  }, [user.isLogin]);
};

export const useUser = () => {
  const dispatch = useDispatch();

  return {
    ...useSelector((state) => state.userData),
    setUser: (payload) => dispatch(setUserData(payload)),
    setUserScore: (payload) => dispatch(setUserScoreData(payload)),
    setUserHP: (payload) => dispatch(setUserHPData(payload)),
  };
};
