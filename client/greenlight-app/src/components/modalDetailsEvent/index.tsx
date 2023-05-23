import React, {useEffect, useState} from 'react';

import {TAppState} from '@app/store';
import {BaseHeader} from '@components/baseHeader';
import {ButtomGo} from '@components/buttomGo';
import {ImageDefault} from '@components/imageDefault';
import MapScreen from '@components/mapScreen';
import {IconSmallCalendarSVG} from '@components/svg/IconSmallCalendarSVG';
import {IconSmallTimeSVG} from '@components/svg/IconSmallTimeSVG';
import IconTaskEditItemsSVG from '@components/svg/IconTaskEditItemsSVG';
import {EColors} from '@domain/enum/EColors';
import {TListItems} from '@domain/types/TListItems';
import {ActionEventDelete} from '@stores/event/store.event.delete';
import {showModaLoading} from '@stores/modals/store.modal.loading';
import * as Location from 'expo-location';
import moment from 'moment';
import {Linking, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

export type TRegion = {
  latitude?: number;
  longitude?: number;
};

interface functionVoid {
  (): void;
}

interface props {
  open: boolean;
  onClose: functionVoid;
  item: TListItems | undefined;
  setOpenAddItem: Function;
}

export const ModalDetailsEvent = ({open, onClose, item, setOpenAddItem}: props) => {
  const dispath = useDispatch();
  const [region, setRegion] = useState<TRegion>({
    latitude: 0,
    longitude: 0,
  });
  const stateLogin = useSelector((state: TAppState) => state.login);

  async function getCoordinatesFromAddress(address: string) {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }

    try {
      const location = await Location.geocodeAsync(address);
      if (location.length > 0) {
        const latitude = location[0].latitude;
        const longitude = location[0].longitude;
        setRegion({latitude, longitude});
      } else {
        console.log('Endereço não encontrado');
      }
    } catch (error) {
      console.log('Erro ao obter a latitude e longitude do endereço:', error);
    }
  }

  useEffect(() => {
    if (!open && !item?.local) {
      return;
    }

    getCoordinatesFromAddress(item?.local || '');
  }, [item]);

  console.log(111, item);
  if (!open && !item) {
    return <></>;
  }

  const openWaze = () => {
    const url = 'waze://app?ll=latitude,longitude&navigate=yes';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
          onClose();
          return;
        }
        dispath(
          showModaLoading({
            title: 'Ops',
            description: 'APP do Waze não esta instalado.',
          }),
        );
      })
      .catch(error => {
        dispath(
          showModaLoading({
            title: 'Ops',
            description: `Ocorreu um erro: ${error.mesage}`,
          }),
        );
      });
  };

  return (
    <>
      <St.ContainerBase />
      <St.Container>
        <St.BaseClose />
        <BaseHeader
          backRoute={() => {
            onClose && onClose();
          }}
          title={item?.title}
        />
        <St.ImageDefault>
          <ImageDefault name="photoBase64" value={item?.photoBase64} />
        </St.ImageDefault>
        <St.Header>
          <St.Col>
            <IconSmallCalendarSVG color={EColors.black} />
            <St.TitleDate>{moment(item?.date).format('DD/MM/YY')}</St.TitleDate>
            <IconSmallTimeSVG color={EColors.black} />
            <St.TitleTimeStart>{item?.timeStart}</St.TitleTimeStart>
          </St.Col>
          <St.Col>
            <St.Image source={require('../../assets/png/photo1.png')} />
            <St.Image source={require('../../assets/png/photo3.png')} />
            <St.Image source={require('../../assets/png/photo4.png')} />
            <St.ImageTitle>+5</St.ImageTitle>
          </St.Col>
        </St.Header>
        <St.Maps>
          <St.TitleTimeStart>{item?.local}</St.TitleTimeStart>
          <MapScreen region={region} />
        </St.Maps>
        <St.Buttons>
          <St.Col style={{width: '85%'}}>
            <ButtomGo textTransform="uppercase" title="IR PARA EVENTO" onPress={openWaze} />
          </St.Col>
          <St.Col>
            <TouchableOpacity
              onPress={() => {
                onClose && onClose();
                dispath(
                  ActionEventDelete({
                    id: item?.id || '',
                    usuarioId: stateLogin.response?.user?._id,
                  }),
                );
              }}>
              <IconTaskEditItemsSVG />
            </TouchableOpacity>
          </St.Col>
        </St.Buttons>
      </St.Container>
    </>
  );
};
