import React from 'react';
import {TouchableOpacity} from 'react-native';

import IconArrowSVG from '@components/svg/IconArrowSVG';
import {pushHistory} from '@stores/store.history';
import {useDispatch} from 'react-redux';
import * as St from './styles';

interface props {
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
}

export const BaseHeader = ({backRoute, title, iconRight = <></>}: props) => {
  const dispath = useDispatch();
  const check = backRoute || title || iconRight;
  return (
    <St.BaseHeader>
      {check && (
        <>
          <St.BackRoute>
            {backRoute && (
              <TouchableOpacity
                onPress={() => {
                  if (typeof backRoute === 'string') {
                    dispath(
                      pushHistory({
                        route: backRoute,
                      }),
                    );
                    return;
                  }

                  backRoute && backRoute();
                }}>
                <St.BackRouteAction>
                  <IconArrowSVG />
                </St.BackRouteAction>
              </TouchableOpacity>
            )}
            <St.Title>{title || ''}</St.Title>
          </St.BackRoute>
          <St.IconRight>{iconRight && iconRight}</St.IconRight>
        </>
      )}
    </St.BaseHeader>
  );
};
