const storeConfigs = 'CONFIGS';

export enum EStoreActionTypeConfigs {
  write = `${storeConfigs}_WRITE`,
}

export type TStoreConfigsRegion = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type TStoreConfigsData = {
  region: TStoreConfigsRegion;
};

export type TStoreConfigsState = {
  type: EStoreActionTypeConfigs.write;
  data?: TStoreConfigsData;
};

export const eventConfigsStateInitial: TStoreConfigsState = {
  type: EStoreActionTypeConfigs.write,
};
