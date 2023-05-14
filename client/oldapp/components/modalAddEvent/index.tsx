import React from 'react';

import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';

import {BaseHeader} from 'components/baseHeader';
import {ButtomGo} from 'components/buttomGo';
import {InputDefault} from 'components/inputDefault';
import MapThumbnail from 'components/mapThumbnail';
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
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
  setOpenAddItem: functionBoolean;
}

export const ModalAddEvent = ({open, navigation, onClose}: props) => {
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
              <St.FormInput style={{width: '47%'}}>
                <InputDefault />
              </St.FormInput>
              <St.FormInput style={{width: '47%'}}>
                <InputDefault />
              </St.FormInput>
            </St.FormRow>
            <St.FormInput>
              <InputDefault />
            </St.FormInput>
          </St.Forms>
          <St.Maps>
            <MapThumbnail />
          </St.Maps>
        </St.FormBase>

        <St.Buttons>
          <St.Col style={{width: '80%'}}>
            <ButtomGo textTransform="uppercase" title="SALVAR EVENTO" onPress={() => {}} />
          </St.Col>
        </St.Buttons>
      </St.Container>
    </>
  );
};
