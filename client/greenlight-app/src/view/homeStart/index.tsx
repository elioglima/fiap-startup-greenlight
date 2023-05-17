import React, {useEffect, useState} from 'react';

import {ButtomGo} from '@components/buttomGo';
import HomeHeader from '@components/homeHeader';
import {LoadApp} from '@components/loadApp';
import ControllerApp from '@components/controllerApp';
import {ModalButtomLogin} from '@components/modalButtomLogin';
import {ActionLogin} from '@stores/store.login';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-native';
import * as St from './styles';
import {TLoginResponse, TLoginState} from '@domain/types/TLogin';
import {TAppState} from '@app/store';
import {pushHistory} from '@stores/store.history';

const HomeView = () => {
  const [optIn, setOptIn] = useState(false);
  const dispath = useDispatch();

  const stateLogin: TLoginState = useSelector((state: TAppState) => state.login);

  const states = useSelector(s => s);
  useEffect(() => {
    if (stateLogin.logged) {
      dispath(
        pushHistory({
          route: '/HomeLogged',
        }),
      );
    }
  }, [states]);

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
