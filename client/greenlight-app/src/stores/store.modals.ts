import {
  EStoreActionModals,
  EStoreModalsDataNames,
  TStoreModalsData,
  TStoreModalsState,
  modalsStateInitial,
} from '@domain/types/states/TStatesModals';

export const showModalParticipants = (data: any): TStoreModalsState => ({
  type: EStoreActionModals.show,
  data: {
    name: EStoreModalsDataNames.listParticipants,
    data,
  },
});

export const showModals = (data: TStoreModalsData) => ({
  type: EStoreActionModals.show,
  data,
});

export const closeModals = () => ({
  type: EStoreActionModals.close,
});

const modals = (state = modalsStateInitial, payload: TStoreModalsState) => {
  switch (payload.type) {
    case EStoreActionModals.show:
      return {
        ...state,
        data: payload.data,
      };
    case EStoreActionModals.close:
      return {
        ...state,
        data: {
          name: undefined,
          data: undefined,
        },
      };
    default:
      return state;
  }
};

export const modalsRootReducers = {modals};
