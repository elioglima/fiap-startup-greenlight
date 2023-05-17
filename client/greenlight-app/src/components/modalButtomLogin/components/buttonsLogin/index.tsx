import React from 'react';

import {ButtomGo} from '@components/buttomGo';
import {ButtomGoogle} from '@components/buttomGoogle';
import * as St from './styles';

interface propState {
  show: boolean;
  setShow: Function;
  setFormLocalShow: Function;
}

export const ButtonsLogin = (props: propState) => {
  const {show, setFormLocalShow} = props;
  if (!show) {
    return <></>;
  }

  return (
    <>
      <St.ContainerBase />
      <St.Container>
        <St.BaseClose />
        <St.TitleBase>
          <St.Title>
            Selecione abaixo um metodo de login para iniciar seu uso na plataforma
          </St.Title>
        </St.TitleBase>
        <St.ButtonBase>
          {/* 
          <St.Button>
            <ButtomFacebook
              textCenter={true}
              title="Continuar com Facebook"
              onPress={() => {
                navigation.navigate('HomeLogged');
              }}
            />
          </St.Button> */}
          <St.Button>
            <ButtomGoogle
              textCenter={true}
              title="Continuar com Google"
              onPress={() => {
                // navigation.navigate('HomeLogged');
              }}
            />
          </St.Button>
          {/* <St.Button>
            <ButtomApple
              textCenter={true}
              title="Continuar com Apple"
              onPress={() => {
                navigation.navigate('HomeLogged');
              }}
            />
          </St.Button> */}
          <St.Button>
            <ButtomGo
              textCenter={true}
              title="Continuar com Email"
              onPress={async () => {
                // await navigation.setParams({
                //   rememberLogin: (await getStoreData('rememberLogin')) || false,
                //   rememberEmail: await getStoreData('rememberEmail'),
                //   rememberSenha: await getStoreData('rememberSenha'),
                //   login: await getStoreData('login'),
                // });
                setFormLocalShow(true);
              }}
            />
          </St.Button>
        </St.ButtonBase>
      </St.Container>
    </>
  );
};
