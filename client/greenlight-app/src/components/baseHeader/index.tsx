import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import IconArrowSVG from '@components/svg/IconArrowSVG';
import * as St from './styles';
import {useDispatch} from 'react-redux';
import {pushHistory} from '@stores/store.history';

interface props {
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
}

export const BaseHeader = ({backRoute, title, iconRight}: props) => {
  const dispath = useDispatch();

  return (
    <St.BaseHeader>
      {(backRoute || title || iconRight) && (
        <>
          <St.BackRoute>
            {backRoute && (
              <TouchableOpacity
                onPress={() => {
                  if (typeof backRoute === 'string') {
                    console.log(backRoute);
                    dispath(
                      pushHistory({
                        route: backRoute,
                      }),
                    );
                    // navigation && navigation.navigate(backRoute);
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
