import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {BaseHeader} from '@components/baseHeader';
import {ModalAddEvent} from '@components/modalAddEvent';
import {ECSSflexFirection} from '@domain/enum/ECSSflexFirection';
import {functionBoolean} from '@domain/interfaces/IFunctions';
import * as St from './styles';

interface props {
  children: any;
  title?: string;
  backRoute?: string | Function;
  iconRight?: any;
  flexFirection?: ECSSflexFirection;

  isModalAddItem?: boolean;
  openAddItem?: boolean;
  setOpenAddItem?: functionBoolean;
}

export const LoadApp = ({
  children,
  backRoute,
  title,
  iconRight,
  flexFirection = ECSSflexFirection.row,

  isModalAddItem = false,
  openAddItem,
  setOpenAddItem,
}: props) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <St.Container>
        <BaseHeader {...{iconRight}} backRoute={backRoute} title={title} />
        <St.Contents {...{'flex-direction': flexFirection}}>{children && children}</St.Contents>
      </St.Container>
      {isModalAddItem && openAddItem && (
        <ModalAddEvent
          open={openAddItem}
          setOpenAddItem={setOpenAddItem}
          onClose={() => {
            setOpenAddItem && setOpenAddItem(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};
