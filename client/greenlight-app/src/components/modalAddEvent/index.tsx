import React from 'react';

import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';

import {BaseHeader} from 'components/baseHeader';
import {ButtomGo} from 'components/buttomGo';
import {InputDefault} from 'components/inputDefault';
import MapThumbnail from 'components/mapThumbnail';
import * as St from './styles';
import {useForm} from 'react-hook-form';
import {serviceAddEvent} from 'service/eventService';
import {TAddEvent} from 'domain/types/TAddEvent';

interface functionBoolean {
  (active: boolean): void;
}

interface functionVoid {
  (): void;
}

interface props {
  open: boolean;
  onClose: functionVoid;
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
  setOpenAddItem: functionBoolean;
}

export const ModalAddEvent = ({open, navigation, onClose}: props) => {
  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      title: '',
      date: '',
      time: '',
      location: '',
    },
  });

  const onSubmitForm = async (data: any) => {
    const dataRequest: TAddEvent = data;

    // to-do: validacao
    const response = await serviceAddEvent(dataRequest);
    if (response) {
      onClose && onClose();
      return;
    }

    navigation.navigate('MessageView', {
      title: 'Atenção',
      message: 'Não foi possível acessar o sistema',
      routeBack: 'HomeStart',
    });
  };

  if (!open) {
    return <></>;
  }

  return (
    <>
      <St.ContainerBase />
      <St.Container>
        <St.BaseClose />

        <St.BaseHeader>
          <BaseHeader
            {...{navigation}}
            backRoute={() => {
              onClose && onClose();
            }}
            title={'Novo Evento'}
          />
        </St.BaseHeader>

        <St.FormBase>
          <St.Forms>
            <St.FormRow>
              <St.FormInput style={{width: '100%'}}>
                <InputDefault
                  name={'title'}
                  placeholder={'informe o titulo'}
                  control={control}
                  formState={formState}
                />
              </St.FormInput>
            </St.FormRow>
            <St.FormRow>
              <St.FormInput style={{width: '47%'}}>
                <InputDefault
                  name={'date'}
                  placeholder={'00/00/0000'}
                  control={control}
                  formState={formState}
                />
              </St.FormInput>

              <St.FormInput style={{width: '47%'}}>
                <InputDefault
                  name={'time'}
                  placeholder={'00h00'}
                  control={control}
                  formState={formState}
                />
              </St.FormInput>
            </St.FormRow>
            <St.FormInput>
              <InputDefault
                name={'location'}
                placeholder={'informe o local'}
                control={control}
                formState={formState}
              />
            </St.FormInput>
          </St.Forms>
          <St.Maps>
            <MapThumbnail />
          </St.Maps>
        </St.FormBase>

        <St.Buttons>
          <St.Col style={{width: '80%'}}>
            <ButtomGo
              textTransform="uppercase"
              title="SALVAR EVENTO"
              onPress={handleSubmit(onSubmitForm)}
            />
          </St.Col>
        </St.Buttons>
      </St.Container>
    </>
  );
};
