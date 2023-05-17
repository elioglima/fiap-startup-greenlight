import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {TListItems} from '@domain/types/TListItems';

import EventList from '@components/eventList';
import {LoadApp} from '@components/loadApp';
import {ModalAddEvent} from '@components/modalAddEvent';
import {ModalDetailsEvent} from '@components/modalDetailsEvent';
import IconBigAddSVG from '@components/svg/IconBigAddSVG';

import * as St from './styles';
import {TAppState} from '@app/store';
import {useSelector} from 'react-redux';

const EventView = () => {
  const [openEditItem, setOpenEditItem] = useState<TListItems | undefined>();
  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const [listData, setListData] = useState<TListItems[]>([]);
  const serviceEventList = useSelector((state: TAppState) => state.serviceEventList);

  useEffect(() => {
    if (!serviceEventList.loaded || serviceEventList.loading) {
      return;
    }

    const list: TListItems[] = serviceEventList.response?.rows || [];
    setListData(list);
  }, [serviceEventList]);

  const IconRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('HomeStart')
        }}>
        <IconBigAddSVG />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <LoadApp backRoute={'HomeLogged'} title="Eventos" iconRight={<IconRight />}>
        <St.Container>
          <EventList
            onPressEdit={value => {
              setOpenEditItem(value);
            }}
            items={listData}
            setOpenAddItem={setOpenAddItem}
          />
        </St.Container>
      </LoadApp>
      <ModalDetailsEvent
        open={!!openEditItem}
        item={openEditItem}
        onClose={() => {
          setOpenEditItem(undefined);
        }}
        setOpenAddItem={() => {}}
      />
      <ModalAddEvent
        open={openAddItem}
        setOpenAddItem={setOpenAddItem}
        onClose={() => {
          setOpenAddItem(false);
        }}
      />
    </>
  );
};

export default EventView;
