import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationSwitchScreenProps} from 'react-navigation';

import {EventList, IconBigAddSVG, LoadApp, ModalAddEvent, ModalDetailsEvent} from 'components';
import {TListItems} from 'domain/types/TListItems';

import * as St from './styles';
import {listEvent} from 'service/eventService';

const EventView = (props: NavigationSwitchScreenProps) => {
  const {navigation} = props;
  const [openEditItem, setOpenEditItem] = useState<TListItems | undefined>();
  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const [listData, setListData] = useState<TListItems[]>([]);

  const loadPage = async () => {
    console.log(111, navigation.state.params);
    const list: TListItems[] = navigation.state.params || [];
    setListData(list);
  };

  useEffect(() => {
    loadPage();
  }, []);

  const IconRight = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HomeStart')}>
        <IconBigAddSVG />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <LoadApp {...props} backRoute={'HomeLogged'} title="Eventos" iconRight={<IconRight />}>
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
        navigation={navigation}
      />
      <ModalAddEvent
        open={openAddItem}
        navigation={navigation}
        setOpenAddItem={setOpenAddItem}
        onClose={() => {
          setOpenAddItem(false);
        }}
      />
    </>
  );
};

export default EventView;
