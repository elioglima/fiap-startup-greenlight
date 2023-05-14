import React from 'react';
import {TouchableOpacity} from 'react-native';

import moment from 'moment';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';

import {
  BaseHeader,
  ButtomGo,
  IconSmallCalendarSVG,
  IconSmallTimeSVG,
  IconTaskEditItemsSVG,
  MapThumbnail,
} from 'components';

import {EColors} from 'domain/enum/EColors';
import {TListItems} from 'domain/types/TListItems';
import * as St from './styles';

interface functionVoid {
  (): void;
}

interface props {
  open: boolean;
  onClose: functionVoid;
  item: TListItems | undefined;
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
}

export const ModalDetailsEvent = ({open, onClose, navigation, item, setOpenAddItem}: props) => {
  if (!open && !item) {
    return <></>;
  }

  return (
    <>
      <St.ContainerBase />
      <St.Container>
        <St.BaseClose />
        <BaseHeader
          {...{navigation}}
          backRoute={() => {
            onClose && onClose();
          }}
          title={item?.title}
        />

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
          <MapThumbnail />
        </St.Maps>
        <St.Buttons>
          <St.Col style={{width: '85%'}}>
            <ButtomGo textTransform="uppercase" title="IR PARA EVENTO" onPress={() => {}} />
          </St.Col>
          <St.Col>
            <TouchableOpacity
              onPress={() => {
                setOpenAddItem(true);
              }}>
              <IconTaskEditItemsSVG />
            </TouchableOpacity>
          </St.Col>
        </St.Buttons>
      </St.Container>
    </>
  );
};
