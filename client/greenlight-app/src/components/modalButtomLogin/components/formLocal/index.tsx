import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {TAppState} from '@app/store';
import {ButtomGo} from '@components/buttomGo';
import {InputDefault} from '@components/inputDefault';
import {SwitchDefault} from '@components/switchDefault';
import {TStoreLoginState} from '@domain/types/states/TStatesLogin';
import {useSelector} from 'react-redux';
import * as St from './styles';

interface propState {
  show: boolean;
  setShow: Function;
  onSubmit: any;
}

export const FormLocal = (props: propState) => {
  const {show, onSubmit} = props;
  const loginSate: TStoreLoginState = useSelector((state: TAppState) => state.login || {});

  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      mail: '',
      password: '',
      rememberLogin: true,
    },
  });

  useEffect(() => {
    console.log(loginSate.remember);
    if (loginSate.remember) {
      setValue('mail', loginSate.remember?.mail || '');
      setValue('password', loginSate.remember?.password || '');
      setValue('rememberLogin', Boolean(loginSate.remember?.rememberLogin));
    }
  }, [loginSate, setValue]);

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
              isLowerCase={true}
              name={'mail'}
              placeholder={'informe o email'}
              control={control}
              formState={formState}
            />
          </St.FormRow>
          <St.FormRow>
            <InputDefault
              name={'password'}
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
