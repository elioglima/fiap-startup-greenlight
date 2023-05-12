import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationSwitchScreenProps} from 'react-navigation';

import {
  HomeLoggedHeader,
  HorizontalMenu,
  IconCalendarAddSVG,
  IconCalendarSVG,
  LoadApp,
  MapThumbnail,
  ModalAddEvent,
} from 'components';

import * as St from './styles';
import {listCategory} from 'service/categoryService';
import {TMenuItem} from 'domain/types/TMenuItem';
import {listEvent} from 'service/eventService';
import {TListItems} from 'domain/types/TListItems';

const HomeView = (props: NavigationSwitchScreenProps) => {
  const {navigation}: NavigationSwitchScreenProps = props;
  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const [listDataCategory, setListDataCategory] = useState<TMenuItem[]>([]);

  const loadPage = async () => {
    const list: TMenuItem[] = await listCategory();
    setListDataCategory(list);
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <>
      <LoadApp {...props}>
        <St.Container>
          <St.Content>
            <St.Box>
              <HomeLoggedHeader />
            </St.Box>
            <St.Box>
              <St.Title>PROXIMO EVENTO</St.Title>
            </St.Box>
            <MapThumbnail />
            <St.ButtomRow>
              <TouchableOpacity
                onPress={async () => {
                  const list: TListItems[] = await listEvent();
                  navigation.navigate('EventView', list);
                }}>
                <St.ButtomBase>
                  <St.ButtomLogo>
                    <IconCalendarSVG />
                  </St.ButtomLogo>
                  <St.ButtomText>Meus Eventos</St.ButtomText>
                </St.ButtomBase>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpenAddItem(true);
                }}>
                <St.ButtomBase>
                  <St.ButtomLogo>
                    <IconCalendarAddSVG />
                  </St.ButtomLogo>
                  <St.ButtomText>Criar Evento</St.ButtomText>
                </St.ButtomBase>
              </TouchableOpacity>
            </St.ButtomRow>
            <St.BoxRow>
              <St.Title>EVENTO NA SUA AREA</St.Title>
              <St.MakerBase>
                <St.Maker>12</St.Maker>
              </St.MakerBase>
            </St.BoxRow>
            <HorizontalMenu
              items={listDataCategory}
              onPressItem={(item: any) => {
                console.log(item);
              }}
            />
          </St.Content>
        </St.Container>
      </LoadApp>
      {openAddItem && (
        <ModalAddEvent
          open={openAddItem}
          navigation={navigation}
          setOpenAddItem={setOpenAddItem}
          onClose={() => {
            setOpenAddItem(false);
          }}
        />
      )}
    </>
  );
};

export default HomeView;
