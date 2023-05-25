import * as Location from 'expo-location';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {BaseHeader} from '@components/baseHeader';
import {ButtomGo} from '@components/buttomGo';
import {InputDefault} from '@components/inputDefault';
import {SelectDefault} from '@components/selectDefault';

import {TAppState} from '@app/store';
import {TStoreEventAddRequest} from '@domain/types/TStates';
import {useDispatch, useSelector} from 'react-redux';

import {ImageDefault} from '@components/imageDefault';
import {InputCalendarDefault} from '@components/inputCalendarDefault';
import {InputTimeDefault} from '@components/inputTimeDefault';
import MapScreen from '@components/mapScreen';
import {functionBoolean, functionVoid} from '@domain/interfaces/IFunctions';
import {ActionEventAdd} from '@stores/event/store.event.add';
import * as St from './styles';

interface props {
  open?: boolean;
  onClose?: functionVoid;
  setOpenAddItem?: functionBoolean;
}

type TRegion = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export const ModalAddEvent = ({open, onClose}: props) => {
  const dispath = useDispatch();

  const [region, setRegion] = useState<TRegion>();
  const login = useSelector((state: TAppState) => state.login.response);
  const stateCategory = useSelector((state: TAppState) => state.category.response?.rows || []);
  // const states = useSelector((state: TAppState) => state.serviceEventAdd || []);

  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      title: 'Novo Evento 2',
      date: new Date().toISOString(),
      time: '19h:15',
      location: 'Rua Abadiania 832b',
      categoriaId: '6464d17fe282cbb0245112f8',
      photoBase64: '',
    },
  });

  const onSubmitForm = async (data: any) => {
    const dataRequest: TStoreEventAddRequest = {
      ...data,
      usuarioId: login?.user?._id,
      isLoadevents: true,
    };

    dispath(ActionEventAdd(dataRequest));
    onClose && onClose();

    // const response = await serviceAddEvent(dataRequest);
    // if (response) {
    //   onClose && onClose();
    //   return;
    // }
  };

  async function getCoordinatesFromAddress(address: string) {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }

    try {
      const location = await Location.geocodeAsync(address);
      if (location.length > 0) {
        const latitude = location[0].latitude;
        const longitude = location[0].longitude;
        setRegion({latitude, longitude});
      } else {
        console.log('Endereço não encontrado');
      }
    } catch (error) {
      console.log('Erro ao obter a latitude e longitude do endereço:', error);
    }
  }

  if (!open) {
    return <></>;
  }

  return (
    <>
      <St.ContainerBase />
      <St.Container>
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
            <St.FormRow
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                paddingBottom: 35,
                marginBottom: 35,
              }}>
              <St.ImageDefault>
                <ImageDefault name={'photoBase64'} control={control} formState={formState} />
              </St.ImageDefault>
              <St.FormInput style={{width: '70%'}}>
                <St.FormInput style={{width: '100%'}}>
                  <SelectDefault
                    name={'categoriaId'}
                    placeholder={'informe o titulo'}
                    control={control}
                    formState={formState}
                    data={stateCategory}
                  />
                </St.FormInput>
                <St.FormInput style={{width: '100%', marginTop: 10}}>
                  <InputDefault
                    name={'title'}
                    placeholder={'informe o titulo'}
                    control={control}
                    formState={formState}
                  />
                </St.FormInput>
              </St.FormInput>
            </St.FormRow>

            <St.FormRow>
              <St.FormInput style={{width: '47%'}}>
                <InputCalendarDefault
                  name={'date'}
                  placeholder={'00/00/0000'}
                  control={control}
                  formState={formState}
                />
              </St.FormInput>

              <St.FormInput style={{width: '47%'}}>
                <InputTimeDefault
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
                onKeyPress={(data: any) => {
                  getCoordinatesFromAddress(data);
                }}
              />
            </St.FormInput>
          </St.Forms>
          <St.Maps>
            <MapScreen region={region} />
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
