import React from 'react';

import {ButtomGo} from '@components/buttomGo';
import * as St from './styles';

const MessageView = () => {
  const state: any = undefined;

  return (
    <>
      <St.ContainerBase />
      <St.Container>
        <St.BaseClose />
        <St.TitleBase>
          <St.Title>{state.params?.title || 'Atencao'}</St.Title>
          <St.Message>{state.params?.message || 'Atencao'}</St.Message>
        </St.TitleBase>
        <St.ButtonBase>
          <St.Button>
            <ButtomGo
              textCenter={true}
              title="Entendi"
              onPress={() => {
                // navigation.navigate(state.params?.routeBack || 'HomeStart');
              }}
            />
          </St.Button>
        </St.ButtonBase>
      </St.Container>
    </>
  );
};

export default MessageView;
