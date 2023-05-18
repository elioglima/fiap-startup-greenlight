import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {TAppState} from '@app/store';
import ControllerApp from '@components/controllerApp';
import HomeLoggedHeader from '@components/homeLoggedHeader';
import HorizontalMenu from '@components/horizontalMenu';
import {LoadApp} from '@components/loadApp';
import MapThumbnail from '@components/mapThumbnail';
import {ModalAddEvent} from '@components/modalAddEvent';
import {IconCalendarAddSVG} from '@components/svg/IconCalendarAddSVG';
import {IconCalendarSVG} from '@components/svg/IconCalendarSVG';
import {TMenuItem} from '@domain/types/TMenuItem';
import {ActionEventList} from '@stores/event/store.event.list';
import {ActionLoginRefresh} from '@stores/login/store.login';
import {ActionCategory} from '@stores/store.service.category';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

const HomeView = () => {
  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const [listDataCategory, setListDataCategory] = useState<TMenuItem[]>([]);

  const dispath = useDispatch();
  const category = useSelector((state: TAppState) => state.serviceCategory);
  const stateLogin = useSelector((state: TAppState) => state.login);

  useEffect(() => {
    if (!category.loaded || category.loading) {
      return;
    }

    const list: TMenuItem[] = category.response?.rows || [];
    setListDataCategory(list);
  }, [category]);

  useEffect(() => {
    dispath(
      ActionLoginRefresh({routeRedirect: '/HomeStart', user: stateLogin.response?.user || {}}),
    );
    dispath(ActionCategory());
  }, []);

  return (
    <ControllerApp>
      <LoadApp>
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
                  dispath(
                    ActionEventList({
                      usuarioId: stateLogin.response?.user?._id || '-1',
                      categoryId: undefined,
                    }),
                  );

                  // const loginStringfy: any = await getStoreData('login');
                  // const login: TDBUser = JSON.parse(loginStringfy);
                  // const list: TListItems[] = await listEvent({
                  //   usuarioId: login._id,
                  //   categoryId: undefined,
                  // });
                  // await navigation.setParams({
                  //   list,
                  //   login,
                  // });

                  // await navigation.navigate('EventView', {list});
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
              onPressItem={async (item: TMenuItem) => {
                // const loginStringfy: any = await getStoreData('login');
                // const login: TDBUser = JSON.parse(loginStringfy);
                // const list: TListItems[] = await listEvent({
                //   usuarioId: login._id,
                //   categoryId: item.id,
                // });
                // await navigation.setParams({
                //   list,
                //   login,
                // });
                // await navigation.navigate('EventView', {list});
              }}
            />
          </St.Content>
        </St.Container>
      </LoadApp>
      {openAddItem && (
        <ModalAddEvent
          open={openAddItem}
          setOpenAddItem={setOpenAddItem}
          onClose={() => {
            setOpenAddItem(false);
          }}
        />
      )}
    </ControllerApp>
  );
};

export default HomeView;
