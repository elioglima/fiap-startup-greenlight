import React, {useState} from 'react';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';

import * as St from './styles';
import {ButtonsLogin} from 'components/modalButtomLogin/components/buttonsLogin';
import {FormLocal} from 'components/modalButtomLogin/components/formLocal';
import {login} from 'service/userService';
import {setStoreData} from 'utils/storage';

interface propState {
  show: boolean;
  setShow: Function;
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
}

export const ModalButtomLogin = (props: propState) => {
  const {show, setShow, navigation} = props;
  const [formLocalShow, setFormLocalShow] = useState<boolean>(false);
  if (!show) {
    return <></>;
  }

  const onSubmitRegisterForm = async (data: any) => {
    const response = await login(data);
    if (response) {
      if (data.rememberLogin) {
        await setStoreData('rememberLogin', data.rememberLogin.toString());
        await setStoreData('rememberEmail', data.email);
        await setStoreData('rememberSenha', data.senha);
        await setStoreData('login', JSON.stringify(response));
      }
      await navigation.navigate('HomeLogged', response);
      return;
    }

    navigation.navigate('MessageView', {
      title: 'Atenção',
      message: 'Não foi possível acessar o sistema',
      routeBack: 'HomeStart',
    });
  };

  return (
    <>
      <St.ContainerBase />
      <ButtonsLogin
        setShow={setShow}
        show={show && !formLocalShow}
        setFormLocalShow={setFormLocalShow}
        navigation={navigation}
      />
      <FormLocal
        setShow={setFormLocalShow}
        show={formLocalShow}
        navigation={navigation}
        onSubmit={onSubmitRegisterForm}
      />
    </>
  );
};
