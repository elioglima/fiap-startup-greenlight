import React from 'react';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';

import * as St from './styles';
import {ButtomGo} from 'components/buttomGo';

interface propState {
  navigation: NavigationSwitchProp<NavigationRoute, NavigationParams>;
}

const MessageView = (props: propState) => {
  const {navigation} = props;
  const state = navigation.state;

  console.log(JSON.stringify(state, null, 4));

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
                navigation.navigate(state.params?.routeBack || 'HomeStart');
              }}
            />
          </St.Button>
        </St.ButtonBase>
      </St.Container>
    </>
  );
};

export default MessageView;
