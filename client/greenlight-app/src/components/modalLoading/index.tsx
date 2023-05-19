import React from 'react';

import {TAppState} from '@app/store';
import {useDispatch, useSelector} from 'react-redux';

import {ButtomGo} from '@components/buttomGo';
import {closeModaLoading} from '@stores/modals/store.modal.loading';
import {pushHistory} from '@stores/store.history';
import * as St from './styles';

export const ModalLoading = () => {
  const dispath = useDispatch();
  const stateModalLoading = useSelector((state: TAppState) => state.modalLoading);

  if (!stateModalLoading.show) {
    return <></>;
  }

  return (
    <St.Container>
      <St.ContainerBase />
      <St.Contents>
        <St.BaseClose
          onPress={() => {
            dispath(pushHistory({route: '/HomeLogged'}));
          }}
        />
        <St.BaseText>
          <St.Title>{stateModalLoading.data?.title || ''}</St.Title>
          <St.Description>{stateModalLoading.data?.description || ''}</St.Description>
        </St.BaseText>
        <St.Buttons>
          <ButtomGo
            textTransform="uppercase"
            title="Fechar"
            onPress={() => {
              dispath(closeModaLoading());
            }}
          />
        </St.Buttons>
      </St.Contents>
    </St.Container>
  );
};
