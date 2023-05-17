import React, {useEffect, useState} from 'react';

import {ButtonsLogin} from '@components/modalButtomLogin/components/buttonsLogin';
import {FormLocal} from '@components/modalButtomLogin/components/formLocal';
import {login} from '@service/userService';
import {setStoreData} from '@utils/storage';
import * as St from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {TAppState} from '@app/store';
import {useHistory} from 'react-router-native';
import {ActionLogin} from '@stores/store.login';

interface propState {
  show: boolean;
  setShow: Function;
}

export const ModalButtomLogin = (props: propState) => {
  const {show, setShow} = props;
  const [formLocalShow, setFormLocalShow] = useState<boolean>(false);
  const history = useHistory();

  const dispath = useDispatch();

  const stateLogin = useSelector((state: TAppState) => state.login);
  useEffect(() => {
    if (stateLogin.logged) {
      // history.push('')
    }
  }, [stateLogin]);

  if (!show) {
    return <></>;
  }

  const onSubmitRegisterForm = async (data: any) => {
    const dataSend = {
      rememberLogin: data.rememberLogin.toString(),
      email: data.email,
      senha: data.senha,
    };

    dispath(ActionLogin(dataSend));
    // const response = await login(data);
    // if (response) {
    //   if (data.rememberLogin) {
    //     await setStoreData('rememberLogin', data.rememberLogin.toString());
    //     await setStoreData('rememberEmail', data.email);
    //     await setStoreData('rememberSenha', data.senha);
    //     await setStoreData('login', JSON.stringify(response));
    //   }
    //   // await navigation.navigate('HomeLogged', response);
    //   return;
    // }

    // navigation.navigate('MessageView', {
    //   title: 'Atenção',
    //   message: 'Não foi possível acessar o sistema',
    //   routeBack: 'HomeStart',
    // });
  };

  return (
    <>
      <St.ContainerBase />
      <ButtonsLogin
        setShow={setShow}
        show={show && !formLocalShow}
        setFormLocalShow={setFormLocalShow}
      />
      <FormLocal setShow={setFormLocalShow} show={formLocalShow} onSubmit={onSubmitRegisterForm} />
    </>
  );
};
