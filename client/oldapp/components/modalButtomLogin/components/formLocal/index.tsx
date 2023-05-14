import React, {useEffect, useState} from 'react';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';
import {useForm} from 'react-hook-form';

import {ButtomGo, InputDefault} from 'components';
import * as St from './styles';
import {SwitchDefault} from 'components/switchDefault';

interface propState {
  show: boolean;
  setShow: Function;
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
  onSubmit: any;
}

export const FormLocal = (props: propState) => {
  const {show, onSubmit, navigation} = props;
  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      email: '',
      senha: '',
      rememberLogin: false,
    },
  });

  useEffect(() => {
    setValue('email', navigation.state.params?.rememberEmail);
    setValue('senha', navigation.state.params?.rememberSenha);
    setValue('rememberLogin', Boolean(navigation.state.params?.rememberLogin));
  }, [navigation.state.params, setValue]);

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
        <St.Forms>
          <St.FormRow>
            <InputDefault
              name={'email'}
              placeholder={'informe o email'}
              control={control}
              formState={formState}
            />
          </St.FormRow>
          <St.FormRow>
            <InputDefault
              name={'senha'}
              secureTextEntry={true}
              placeholder={'informe a senha'}
              control={control}
              formState={formState}
            />
          </St.FormRow>
          <St.FormRow>
            <SwitchDefault
              name={'rememberLogin'}
              placeholder={'Manter conectado'}
              control={control}
              formState={formState}
            />
          </St.FormRow>
        </St.Forms>
        <St.ButtonBase>
          <St.Button>
            <ButtomGo textCenter={true} title="Entrar" onPress={handleSubmit(onSubmit)} />
          </St.Button>
          <St.Title>Não tenho cadastro, clique aqui</St.Title>
        </St.ButtonBase>
      </St.Container>
    </>
  );
};
