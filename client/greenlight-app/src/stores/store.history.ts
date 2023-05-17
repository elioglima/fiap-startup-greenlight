import {THistory} from '@domain/types/THistory';

const name = 'HISTORY';

export enum EActionTypeLogin {
  execute = `${name}_EXECUTE`,
  clear = `${name}_CLEAR`,
}

type Action =
  | {type: EActionTypeLogin.execute; data?: THistory}
  | {type: EActionTypeLogin.clear; data: THistory};

export const pushHistory = (data: THistory) => {
  if (!data?.route) {
    return {
      type: undefined,
    };
  }

  return {
    type: EActionTypeLogin.execute,
    data,
  };
};

export const clearHistory = () => ({
  type: EActionTypeLogin.clear,
});

const initialState: THistory = {
  route: undefined,
  data: undefined,
};

const history = (state = initialState, payload: Action) => {
  switch (payload.type) {
    case EActionTypeLogin.execute:
      return {...state, data: payload.data};
    case EActionTypeLogin.clear:
      return {...state, data: undefined};
    default:
      return state;
  }
};

export const historyRootReducers = {history};
