import React, {useEffect, useState} from 'react';

import {TAppState} from '@app/store';
import {ButtomGo} from '@components/buttomGo';
import ControllerApp from '@components/controllerApp';
import HomeHeader from '@components/homeHeader';
import {LoadApp} from '@components/loadApp';
import {ModalButtomLogin} from '@components/modalButtomLogin';
import {TStoreLoginState} from '@domain/types/states/TStatesLogin';
import {ActionCheckout} from '@stores/login/store.login';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

const HomeView = () => {
  const [optIn, setOptIn] = useState(false);
  const dispath = useDispatch();

  const stateLogin: TStoreLoginState = useSelector((state: TAppState) => state.login);
  useEffect(() => {
    if (!stateLogin?.response && !stateLogin?.remember) {
      return;
    }

    dispath(
      ActionCheckout({
        routeCurrent: '/HomeStart',
        routeRedirect: '/HomeLogged',
        user: stateLogin.response?.user,
        remember: stateLogin.remember,
      }),
    );
  }, []);

  return (
    <ControllerApp>
      <LoadApp>
        <St.HomeHeader>
          <HomeHeader />
        </St.HomeHeader>
        <St.Logo>
          <St.LogoText>Greenlight</St.LogoText>
        </St.Logo>
        <St.Title>Estavamos à sua espera!</St.Title>
        <St.Description>
          Bem-vindo ao nosso aplicativo de eventos! Aqui você encontrará informações sobre
          esportivos, maratonas, corridas,e muito mais.
        </St.Description>
        {optIn ? (
          <ModalButtomLogin show={optIn} setShow={setOptIn} />
        ) : (
          <St.ButtomStart>
            <ButtomGo
              textTransform="uppercase"
              title="Vamos Começar"
              onPress={() => {
                setOptIn(true);
              }}
            />
          </St.ButtomStart>
        )}
      </LoadApp>
    </ControllerApp>
  );
};

export default HomeView;
