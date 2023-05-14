import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {BaseHeader} from 'components/baseHeader';
import {ECSSflexFirection} from 'domain/enum/ECSSflexFirection';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';
import * as St from './styles';

interface props {
  children: any;
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
  navigation?: NavigationSwitchProp<NavigationRoute, NavigationParams>;
  flexFirection?: ECSSflexFirection;
}

export const LoadApp = ({
  children,
  navigation,
  backRoute,
  title,
  iconRight,
  flexFirection = ECSSflexFirection.row,
}: props) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <BaseHeader {...{navigation, iconRight}} backRoute={backRoute} title={title} />
      <St.Container {...{'flex-direction': flexFirection}}>{children && children}</St.Container>
    </SafeAreaView>
  );
};
