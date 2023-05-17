import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {BaseHeader} from '@components/baseHeader';
import {ECSSflexFirection} from '@domain/enum/ECSSflexFirection';
import * as St from './styles';

interface props {
  children: any;
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
  flexFirection?: ECSSflexFirection;
}

export const LoadApp = ({
  children,
  backRoute,
  title,
  iconRight,
  flexFirection = ECSSflexFirection.row,
}: props) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <BaseHeader {...{iconRight}} backRoute={backRoute} title={title} />
      <St.Container {...{'flex-direction': flexFirection}}>{children && children}</St.Container>
    </SafeAreaView>
  );
};
