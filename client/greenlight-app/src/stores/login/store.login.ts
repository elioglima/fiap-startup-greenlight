import {TAPILoginRequest} from '@domain/types/TAPILogin';
import {TLoginRemember, TLoginUser} from '@domain/types/TLogin';
import {
  EStoreActionTypeLogin,
  TStoreLoginRequest,
  TStoreLoginResponse,
  TStoreLoginState,
  initialLoginState,
} from '@domain/types/states/TStatesLogin';
import * as userService from '@service/userService';
import {pushHistory} from '@stores/store.history';
import {call, put} from 'redux-saga/effects';

export const ActionLogin = (request: TStoreLoginRequest) => ({
  type: EStoreActionTypeLogin.login,
  request,
});

export const ActionLogout = () => ({
  type: EStoreActionTypeLogin.logout,
});

export const ActionLoginRefresh = ({
  routeCurrent,
  routeRedirect,
  user,
}: {
  routeCurrent: string;
  routeRedirect?: string;
  user?: TLoginUser;
}) => ({
  type: EStoreActionTypeLogin.refresh,
  routeCurrent,
  routeRedirect,
  userTemp: user,
});

export const ActionCheckout = ({
  routeCurrent,
  routeRedirect,
  user,
  remember,
}: {
  routeCurrent: string;
  routeRedirect?: string;
  user?: TLoginUser;
  remember?: TLoginRemember;
}) => ({
  type: EStoreActionTypeLogin.checkout,
  routeCurrent,
  routeRedirect,
  userTemp: user,
  remember: remember,
});

export const ActionSuccess = (response: TStoreLoginResponse) => ({
  type: EStoreActionTypeLogin.success,
  response,
});

export const ActionError = (message: string, response: TStoreLoginResponse) => ({
  type: EStoreActionTypeLogin.error,
  response,
  message,
});

const reduceLogin = (state = initialLoginState, payload: TStoreLoginState) => {
  switch (payload.type) {
    case EStoreActionTypeLogin.login:
      return {
        ...state,
        logged: false,
        request: payload.request,
        response: undefined,
        routeRedirect: undefined,
        routeCurrent: undefined,
        remember: payload.request,
      };
    case EStoreActionTypeLogin.logout:
      return {
        ...state,
        logged: false,
        request: undefined,
        response: undefined,
        routeRedirect: undefined,
        routeCurrent: undefined,
        remember: {
          ...state?.remember,
          rememberLogin: false,
        },
        error: false,
      };
    case EStoreActionTypeLogin.refresh:
      return {
        ...state,
        routeRedirect: payload.routeRedirect,
        routeCurrent: payload.routeCurrent,
        userTemp: payload.userTemp,
      };
    case EStoreActionTypeLogin.checkout:
      return {
        ...state,
        routeRedirect: payload.routeRedirect,
        routeCurrent: payload.routeCurrent,
        userTemp: payload.userTemp,
      };
    case EStoreActionTypeLogin.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        logged: true,
        routeRedirect: undefined,
      };

    case EStoreActionTypeLogin.error:
      return {
        ...state,
        response: payload.response,
        message: payload.message,
        routeRedirect: payload.routeRedirect,
        logged: false,
        error: true,
      };

    default:
      return state;
  }
};

function* loginSagas(dataStore: TStoreLoginState): Generator<any> {
  const request: any = dataStore.request;
  if (!request) {
    return;
  }

  try {
    const dataRequest: TAPILoginRequest = {
      rememberLogin: request.rememberLogin,
      email: request.mail.toString().toLowerCase(),
      senha: request.password,
    };

    const response: any = yield call(userService.login, dataRequest);

    if (response) {
      const user = {
        _id: response?._id,
        date: response?.data,
        mail: response?.email,
        name: response?.nome,
        photoBase64: response?.fotoBase64,
        token: response?.token,
        refreshKey: response?.refreshKey,
      };
      yield put(ActionSuccess({user: user, ...request}));
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

function* loginRefreshSagas(dataStore: TStoreLoginState): Generator<any> {
  const request: TStoreLoginRequest | undefined = dataStore.request;

  if (!dataStore.userTemp?.token) {
    return;
  }

  const requestData: any = {
    token: dataStore.userTemp?.token,
    refreshKey: dataStore.userTemp?.refreshKey,
  };

  try {
    const response: any = yield call(userService.loginRefresh, requestData);
    if (response) {
      const user = {
        _id: response?._id,
        date: response?.data,
        mail: response?.email,
        name: response?.nome,
        photoBase64: response?.fotoBase64,
        token: response?.token,
        refreshKey: response?.refreshKey,
      };

      yield put(ActionSuccess({user: user, ...request}));
    }

    if (dataStore.routeRedirect) {
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

function* checkoutSagas(dataStore: TStoreLoginState): Generator<any> {
  const request: TStoreLoginRequest | undefined = dataStore.request;

  if (!dataStore.userTemp?.token && !dataStore?.remember) {
    return;
  }

  try {
    if (dataStore.userTemp?.token) {
      const requestData: any = {
        token: dataStore.userTemp?.token,
        refreshKey: dataStore.userTemp?.refreshKey,
      };

      const response: any = yield call(userService.loginRefresh, requestData);
      if (response) {
        const user = {
          _id: response?._id,
          date: response?.data,
          mail: response?.email,
          name: response?.nome,
          photoBase64: response?.fotoBase64,
          token: response?.token,
          refreshKey: response?.refreshKey,
        };

        yield put(ActionSuccess({user: user, ...request}));
        yield put(
          pushHistory({
            route: '/HomeLogged',
            data: response,
          }),
        );
      }
    } else if (
      dataStore.remember?.rememberLogin &&
      dataStore?.remember?.mail &&
      dataStore?.remember?.password
    ) {
      const dataRequest: TAPILoginRequest = {
        rememberLogin: dataStore.remember?.rememberLogin,
        email: dataStore?.remember?.mail,
        senha: dataStore?.remember?.password,
      };

      const response: any = yield call(userService.login, dataRequest);

      if (response) {
        const user = {
          _id: response?._id,
          date: response?.data,
          mail: response?.email,
          name: response?.nome,
          photoBase64: response?.fotoBase64,
          token: response?.token,
          refreshKey: response?.refreshKey,
        };
        yield put(ActionSuccess({user: user, ...request}));
        yield put(
          pushHistory({
            route: '/HomeLogged',
            data: response,
          }),
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutSagas(dataStore: TStoreLoginState): Generator<any> {
  yield put(
    pushHistory({
      route: '/HomeStart',
    }),
  );
}

export const loginRootReducers = {login: reduceLogin};
export const loginRootSagas = [
  {name: EStoreActionTypeLogin.login, data: loginSagas},
  {name: EStoreActionTypeLogin.refresh, data: loginRefreshSagas},
  {name: EStoreActionTypeLogin.checkout, data: checkoutSagas},
  {name: EStoreActionTypeLogin.logout, data: logoutSagas},
];
