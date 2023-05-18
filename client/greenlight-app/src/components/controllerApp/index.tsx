import {TAppState} from '@app/store';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {THistory} from '@domain/types/THistory';
import {clearHistory} from '@stores/store.history';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-native';
import * as St from './styles';

export default ({children}: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateHitory: THistory = useSelector((state: TAppState) => state.history?.data);

  useEffect(() => {
    if (!stateHitory?.route) {
      return;
    }

    dispatch(clearHistory());
    history.push(stateHitory.route || '', stateHitory.data);
  }, [stateHitory]);
  return <St.Container>{children && children}</St.Container>;
};
