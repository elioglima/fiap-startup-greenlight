import React, {useState} from 'react';

import {ButtonsLogin} from '@components/modalButtomLogin/components/buttonsLogin';
import {FormLocal} from '@components/modalButtomLogin/components/formLocal';
import {ActionLogin} from '@stores/login/store.login';
import {useDispatch} from 'react-redux';
import * as St from './styles';

interface propState {
  show: boolean;
  setShow: Function;
}

export const ModalButtomLogin = (props: propState) => {
  const {show, setShow} = props;
  const [formLocalShow, setFormLocalShow] = useState<boolean>(false);
  const dispath = useDispatch();

  if (!show) {
    return <></>;
  }

  const onSubmitRegisterForm = async (data: any) => {
    const dataSend = {
      rememberLogin: data.rememberLogin.toString(),
      email: data.email,
      senha: data.senha,
    };

    console.log(dataSend);
    dispath(ActionLogin(dataSend));
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
