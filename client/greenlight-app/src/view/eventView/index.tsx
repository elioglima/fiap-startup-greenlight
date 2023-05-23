import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {TListItems} from '@domain/types/TListItems';

import EventList from '@components/eventList';
import {LoadApp} from '@components/loadApp';
import {ModalDetailsEvent} from '@components/modalDetailsEvent';
import IconBigAddSVG from '@components/svg/IconBigAddSVG';

import {TAppState} from '@app/store';
import ControllerApp from '@components/controllerApp';
import {TStoreEventListState} from '@domain/types/TStates';
import {useSelector} from 'react-redux';
import * as St from './styles';

const EventView = () => {
  const [openEditItem, setOpenEditItem] = useState<TListItems | undefined>();
  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const [listData, setListData] = useState<TListItems[]>([]);
  const stateEventList: TStoreEventListState = useSelector((state: TAppState) => state.eventList);

  useEffect(() => {
    if (!stateEventList.loaded || stateEventList.loading) {
      return;
    }

    console.log(stateEventList.response?.rows);
    const list: TListItems[] = stateEventList.response?.rows || [];
    setListData(list);
  }, [stateEventList]);

  const IconRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOpenAddItem(true);
        }}>
        <IconBigAddSVG />
      </TouchableOpacity>
    );
  };
  return (
    <ControllerApp>
      <LoadApp
        backRoute={'/HomeLogged'}
        title="Eventos"
        iconRight={<IconRight />}
        isModalAddItem={true}
        openAddItem={openAddItem}
        setOpenAddItem={setOpenAddItem}>
        <St.Container>
          {stateEventList.request?.categoriaTitle && (
            <St.BaseTitle>
              <St.Title>{stateEventList.request?.categoriaTitle}</St.Title>
            </St.BaseTitle>
          )}
          <St.EventList>
            <EventList
              onPressEdit={value => {
                setOpenEditItem(value);
              }}
              items={listData}
              setOpenAddItem={setOpenAddItem}
            />
          </St.EventList>
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
    </ControllerApp>
  );
};

export default EventView;
