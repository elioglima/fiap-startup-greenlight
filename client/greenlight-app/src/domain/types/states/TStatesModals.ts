const storeConfigs = 'MODALS';

export enum EStoreActionModals {
  show = `${storeConfigs}_SHOW`,
  close = `${storeConfigs}_CLOSE`,
}

export enum EStoreModalsDataNames {
  listParticipants = 'listParticipants',
}

export type TStoreModalsData = {
  name?: EStoreModalsDataNames;
  data?: any;
};

export type TStoreModalsState =
  | {
      type: EStoreActionModals.show;
      data?: TStoreModalsData;
    }
  | {
      type: EStoreActionModals.close;
      data?: TStoreModalsData;
    };

export const modalsStateInitial: TStoreModalsState = {
  type: EStoreActionModals.show,
};
