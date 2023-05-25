import {TAppState} from '@app/store';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {ModalLoading} from '@components/modalLoading';
import {THistory} from '@domain/types/THistory';
import {setConfigsRegion} from '@stores/store.configs';
import {clearHistory} from '@stores/store.history';
import * as Location from 'expo-location';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-native';

import {ModalListParticipant} from '@components/modalListParticipant';
import * as St from './styles';

export default ({children}: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const stateHitory: THistory = useSelector((state: TAppState) => state.history?.data);

  async function getLocationPermission() {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }

    // Permissão concedida, você pode prosseguir para obter a localização.
  }

  async function getCurrentLocation() {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    dispatch(setConfigsRegion({latitude, longitude}));
  }

  useEffect(() => {
    getLocationPermission();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!stateHitory?.route) {
      return;
    }

    dispatch(clearHistory());
    history.push(stateHitory.route || '', stateHitory.data);
  }, [stateHitory]);

  return (
    <St.Container>
      {children && children}
      <ModalLoading />
      <ModalListParticipant />
    </St.Container>
  );
};
