import React from 'react';
import {useForm} from 'react-hook-form';

import {ButtomGo} from '@components/buttomGo';
import {InputDefault} from '@components/inputDefault';
import {SwitchDefault} from '@components/switchDefault';
import * as St from './styles';

interface propState {
  show: boolean;
  setShow: Function;
  onSubmit: any;
}

export const FormLocal = (props: propState) => {
  const {show, onSubmit} = props;
  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      email: 'elio.designer@hotmail.com',
      senha: 'Ab@102030',
      rememberLogin: true,
    },
  });

  // useEffect(() => {
  //   setValue('email', navigation.state.params?.rememberEmail);
  //   setValue('senha', navigation.state.params?.rememberSenha);
  //   setValue('rememberLogin', Boolean(navigation.state.params?.rememberLogin));
  // }, [navigation.state.params, setValue]);

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
