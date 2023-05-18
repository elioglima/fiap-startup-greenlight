import moment from 'moment';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';

import {TAppState} from '@app/store';
import {BaseHeader} from '@components/baseHeader';
import {ButtomGo} from '@components/buttomGo';
import MapThumbnail from '@components/mapThumbnail';
import {IconSmallCalendarSVG} from '@components/svg/IconSmallCalendarSVG';
import {IconSmallTimeSVG} from '@components/svg/IconSmallTimeSVG';
import IconTaskEditItemsSVG from '@components/svg/IconTaskEditItemsSVG';
import {EColors} from '@domain/enum/EColors';
import {TListItems} from '@domain/types/TListItems';
import {ActionEventDelete} from '@stores/event/store.event.delete';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

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
  const serviceEventDelete = useSelector((state: TAppState) => state.serviceEventDelete);

  useEffect(() => {
    console.log(serviceEventDelete);
  }, [serviceEventDelete]);

  if (!open && !item) {
    return <></>;
  }

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
                dispath(ActionEventDelete({id: item?.id || ''}));
              }}>
              <IconTaskEditItemsSVG />
            </TouchableOpacity>
          </St.Col>
        </St.Buttons>
      </St.Container>
    </>
  );
};
