import {TLoginAccess, TLoginRequest, TLoginResponse, TLoginState} from '@domain/types/TLogin';
import {call, put} from 'redux-saga/effects';
import * as userService from '@service/userService';
import {pushHistory} from '@stores/store.history';

const name = 'LOGIN';

export enum EActionTypeLogin {
  execute = `${name}_EXECUTE`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

type Action =
  | {type: EActionTypeLogin.execute; data?: TLoginState}
  | {type: EActionTypeLogin.success; data: TLoginState}
  | {type: EActionTypeLogin.error; data: TLoginState};

export const ActionLogin = (request: TLoginRequest) => ({
  type: EActionTypeLogin.execute,
  data: {
    request,
  },
});

export const ActionSuccess = (response: TLoginResponse) => ({
  type: EActionTypeLogin.success,
  data: {
    response,
  },
});

export const ActionError = (message: string, response: TLoginResponse) => ({
  type: EActionTypeLogin.error,
  data: {
    response,
    message,
  },
});

const initialState: TLoginState = {
  logged: false,
  message: undefined,
  error: false,
};

const login = (state = initialState, payload: Action) => {
  switch (payload.type) {
    case EActionTypeLogin.execute:
      return {...state, request: payload.data?.request};
    case EActionTypeLogin.success:
      return {
        ...state,
        response: payload.data?.response,
        message: 'success',
        logged: true,
      };

    case EActionTypeLogin.error:
      return {
        ...state,
        response: payload.data?.response,
        message: payload.data?.message,
        logged: false,
        error: true,
      };

    default:
      return state;
  }
};

export const loginRootReducers = {login};

function* loginSagas(dataStore: Action): Generator<any> {
  const request: TLoginRequest | undefined = dataStore.data?.request;
  if (!request) {
    return;
  }

  try {
    const response: any = yield call(userService.login, request);
    if (response) {
      yield put(ActionSuccess({user: response}));
      yield put(
        pushHistory({
          route: '/HomeLogged',
          data: response,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const loginRootSagas = [{name: EActionTypeLogin.execute, data: loginSagas}];
