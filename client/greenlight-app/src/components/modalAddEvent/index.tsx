import React from 'react';
import {useForm} from 'react-hook-form';

import {BaseHeader} from '@components/baseHeader';
import {ButtomGo} from '@components/buttomGo';
import {InputDefault} from '@components/inputDefault';
import {SelectDefault} from '@components/selectDefault';

import {TAppState} from '@app/store';
import MapThumbnail from '@components/mapThumbnail';
import {TStoreEventAddRequest} from '@domain/types/TStates';
import {useDispatch, useSelector} from 'react-redux';

import {ActionEventAdd} from '@stores/event/store.event.add';
import * as St from './styles';

interface functionBoolean {
  (active: boolean): void;
}

interface functionVoid {
  (): void;
}

interface props {
  open: boolean;
  onClose: functionVoid;
  setOpenAddItem: functionBoolean;
}

export const ModalAddEvent = ({open, onClose}: props) => {
  const dispath = useDispatch();
  const login = useSelector((state: TAppState) => state.login.response);
  const category = useSelector((state: TAppState) => state.serviceCategory.response?.rows || []);

  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      title: 'Novo Evento 2',
      date: new Date().toISOString(),
      time: '19h:15',
      location: 'Rua Abadiania 832b',
      categoryId: '6464d17fe282cbb0245112f8',
    },
  });

  const onSubmitForm = async (data: any) => {
    const dataRequest: TStoreEventAddRequest = {
      ...data,
      usuarioId: login?.user?._id,
    };
    dispath(ActionEventAdd(dataRequest));

    // to-do: validacao
    // const response = await serviceAddEvent(dataRequest);
    // if (response) {
    //   onClose && onClose();
    //   return;
    // }
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
                <SelectDefault
                  name={'categoryId'}
                  placeholder={'informe o titulo'}
                  control={control}
                  formState={formState}
                  data={category}
                />
              </St.FormInput>
            </St.FormRow>
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
