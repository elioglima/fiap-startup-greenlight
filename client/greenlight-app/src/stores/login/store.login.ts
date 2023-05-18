import {TLoginRequest, TLoginResponse, TLoginState, TLoginUser} from '@domain/types/TLogin';
import * as userService from '@service/userService';
import {pushHistory} from '@stores/store.history';
import {call, put} from 'redux-saga/effects';

const name = 'ACCESS';

export enum EActionTypeLogin {
  login = `${name}_LOGIN`,
  refresh = `${name}_REFRESH`,
  logout = `${name}_LOGOUT`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

type Action =
  | {type: EActionTypeLogin.login; data?: TLoginState}
  | {type: EActionTypeLogin.logout; data?: TLoginState}
  | {type: EActionTypeLogin.refresh; data?: TLoginState}
  | {type: EActionTypeLogin.success; data: TLoginState}
  | {type: EActionTypeLogin.error; data: TLoginState};

export const ActionLogin = (request: TLoginRequest) => ({
  type: EActionTypeLogin.login,
  data: {
    request,
  },
});

export const ActionLogout = () => ({
  type: EActionTypeLogin.logout,
});

export const ActionLoginRefresh = ({
  routeRedirect,
  user,
}: {
  routeRedirect?: string;
  user: TLoginUser;
}) => ({
  type: EActionTypeLogin.refresh,
  data: {
    routeRedirect,
    userTemp: user,
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

const reduceLogin = (state = initialState, payload: Action) => {
  switch (payload.type) {
    case EActionTypeLogin.login:
      return {
        ...state,
        logged: false,
        request: payload.data?.request,
        response: undefined,
        routeRedirect: undefined,
      };
    case EActionTypeLogin.logout:
      return {
        ...state,
        request: undefined,
        response: undefined,
        routeRedirect: undefined,
      };
    case EActionTypeLogin.refresh:
      return {
        ...state,
        routeRedirect: payload.data?.routeRedirect,
        userTemp: payload.data?.userTemp,
      };
    case EActionTypeLogin.success:
      return {
        ...state,
        response: payload.data?.response,
        message: 'success',
        logged: true,
        routeRedirect: undefined,
      };

    case EActionTypeLogin.error:
      return {
        ...state,
        response: payload.data?.response,
        message: payload.data?.message,
        routeRedirect: payload.data?.routeRedirect,
        logged: false,
        error: true,
      };

    default:
      return state;
  }
};

export const loginRootReducers = {login: reduceLogin};

function* loginSagas(dataStore: Action): Generator<any> {
  const request: TLoginRequest | undefined = dataStore.data?.request;
  if (!request) {
    return;
  }

  try {
    const response: any = yield call(userService.login, request);
    if (response) {
      yield put(ActionSuccess({user: response, ...request}));
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

function* loginRefreshSagas(dataStore: Action): Generator<any> {
  const request: TLoginRequest | undefined = dataStore.data?.request;
  if (!dataStore.data?.userTemp?.token) {
    yield put(
      pushHistory({
        route: '/HomeStart',
        data: undefined,
      }),
    );

    return;
  }

  const requestData: any = {
    token: dataStore.data?.userTemp?.token,
    refreshKey: dataStore.data?.userTemp?.refreshKey,
  };

  try {
    const response: any = yield call(userService.loginRefresh, requestData);
    if (response) {
      yield put(ActionSuccess({user: response, ...request}));
      return;
    }

    if (dataStore.data.routeRedirect) {
      yield put(
        pushHistory({
          route: dataStore.data.routeRedirect,
          data: response,
        }),
      );

      yield put(ActionLogout());
      return;
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const loginRootSagas = [
  {name: EActionTypeLogin.login, data: loginSagas},
  {name: EActionTypeLogin.refresh, data: loginRefreshSagas},
];
