import React from 'react';

import {TAppState} from '@app/store';
import {ImageDefault} from '@components/imageDefault';
import {ETypeImage} from '@domain/enum/ETypeImage';
import {TStoreLoginState} from '@domain/types/states/TStatesLogin';
import {ActionLogout} from '@stores/login/store.login';
import {ActionProfileUpload} from '@stores/store.profile';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

export const HomeLoggedHeader: React.FC = () => {
  const dispatch = useDispatch();
  const stateLogin: TStoreLoginState = useSelector((state: TAppState) => state.login);
  const {control, formState, handleSubmit, setValue} = useForm({
    defaultValues: {
      photoBase64: stateLogin?.response?.user?.photoBase64,
    },
  });

  return (
    <St.Container>
      <St.BaseText>
        <St.h5>Oi, {`${stateLogin.response?.user?.name}`}</St.h5>
        <St.h2>Bora treinar?</St.h2>
      </St.BaseText>
      <St.BasePhoto>
        <St.BaseLogout>
          <TouchableOpacity
            onPress={() => {
              dispatch(ActionLogout());
            }}>
            <St.TextLogout>Sair</St.TextLogout>
          </TouchableOpacity>
        </St.BaseLogout>
        <ImageDefault
          name={'photoBase64'}
          control={control}
          formState={formState}
          typeImage={ETypeImage.photo}
          onUpload={({urlBase64}: {urlBase64: string}) => {
            const usuarioId = stateLogin.response?.user?._id;
            if (!usuarioId) {
              return;
            }
            dispatch(
              ActionProfileUpload({
                usuarioId,
                photoBase64: urlBase64,
              }),
            );
          }}
        />
      </St.BasePhoto>
    </St.Container>
  );
};

export default HomeLoggedHeader;
