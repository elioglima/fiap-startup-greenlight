import {TAppState} from '@app/store';
import {IconRight} from '@components/baseHeader/styles';
import {ImageDefault} from '@components/imageDefault';
import {LoadApp} from '@components/loadApp';
import {ECSSflexFirection} from '@domain/enum/ECSSflexFirection';
import {ETypeImage} from '@domain/enum/ETypeImage';
import {TListItems} from '@domain/types/TListItems';
import {TListParticioants} from '@domain/types/TListParticioants';
import {EStoreModalsDataNames, TStoreModalsState} from '@domain/types/states/TStatesModals';
import {closeModals} from '@stores/store.modals';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as St from './styles';

export const ModalListParticipant = () => {
  const dispath = useDispatch();

  const [openAddItem, setOpenAddItem] = useState<boolean>(false);
  const modals: TStoreModalsState = useSelector((state: TAppState) => state.modals);
  const stateLogin = useSelector((state: TAppState) => state.login);

  const [list, setList] = useState<TListParticioants[]>();
  useEffect(() => {
    if (modals.data?.name !== EStoreModalsDataNames.listParticipants) {
      return;
    }

    const data: TListItems = modals.data?.data;
    setList(data?.participants || []);
  }, [modals]);

  if (modals.data?.name !== EStoreModalsDataNames.listParticipants) {
    return <></>;
  }

  return (
    <St.Container>
      <LoadApp
        flexFirection={ECSSflexFirection.column}
        backRoute={() => {
          dispath(closeModals());
        }}
        title="Participantes"
        iconRight={<IconRight />}>
        <St.ListBase>
          {list &&
            list.map((item: TListParticioants) => {
              return (
                <St.ListRow>
                  <St.Row>
                    <St.PhotoBase64>
                      <ImageDefault
                        typeImage={ETypeImage.photoParticipants}
                        name="photoBase64"
                        value={item?.photoBase64}
                      />
                    </St.PhotoBase64>
                    <St.Title>{item.name}</St.Title>
                  </St.Row>
                </St.ListRow>
              );
            })}
        </St.ListBase>
      </LoadApp>
    </St.Container>
  );
};
