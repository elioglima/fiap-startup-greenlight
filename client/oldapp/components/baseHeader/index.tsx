import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {IconArrowSVG} from 'components/svg';
import {NavigationParams, NavigationRoute, NavigationSwitchProp} from 'react-navigation';
import * as St from './styles';

interface props {
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
  navigation?: NavigationSwitchProp<NavigationRoute, NavigationParams>;
}

export const BaseHeader = ({navigation, backRoute, title, iconRight}: props) => {
  return (
    <St.BaseHeader>
      {(backRoute || title || iconRight) && (
        <>
          <St.BackRoute>
            {backRoute && (
              <TouchableOpacity
                onPress={() => {
                  if (typeof backRoute === 'string') {
                    navigation && navigation.navigate(backRoute);
                    return;
                  }

                  backRoute && backRoute();
                }}>
                <St.BackRouteAction>
                  <IconArrowSVG />
                </St.BackRouteAction>
              </TouchableOpacity>
            )}
            <St.Title>{title && title}</St.Title>
          </St.BackRoute>
          <St.IconRight>{iconRight ? iconRight : () => <Text />}</St.IconRight>
        </>
      )}
    </St.BaseHeader>
  );
};
