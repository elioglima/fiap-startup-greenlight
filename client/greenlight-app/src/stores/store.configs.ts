import {
  EStoreActionTypeConfigs,
  TStoreConfigsRegion,
  TStoreConfigsState,
  eventConfigsStateInitial,
} from '@domain/types/states/TStatesConfigs';

export const setConfigsRegion = (region: TStoreConfigsRegion) => ({
  type: EStoreActionTypeConfigs.write,
  data: {
    region,
  },
});

const configs = (state = eventConfigsStateInitial, payload: TStoreConfigsState) => {
  switch (payload.type) {
    case EStoreActionTypeConfigs.write:
      return {
        ...state,
        data: {
          ...(state.data || {}),
          ...payload.data,
        },
      };
    default:
      return state;
  }
};

export const configsRootReducers = {configs};
