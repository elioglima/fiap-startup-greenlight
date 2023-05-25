import {TLoginRemember, TLoginUser} from '@domain/types/TLogin';

const name = 'ACCESS';

export enum EStoreActionTypeLogin {
  login = `${name}_LOGIN`,
  refresh = `${name}_REFRESH`,
  checkout = `${name}_CHECKOUT`,
  logout = `${name}_LOGOUT`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

export type TStoreLoginRequest = {
  mail: string;
  password: string;
  rememberLogin: boolean;
};

export type TStoreLoginResponse = {
  user?: TLoginUser;
  rememberLogin?: boolean;
  mail?: string;
  password?: string;
};

export type TStoreLoginState =
  | {
      type: EStoreActionTypeLogin.login;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      remember?: TLoginRemember;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      routeCurrent?: string;
    }
  | {
      type: EStoreActionTypeLogin.logout;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      remember?: TLoginRemember;
      routeCurrent?: string;
    }
  | {
      type: EStoreActionTypeLogin.refresh;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      remember?: TLoginRemember;
      routeCurrent?: string;
    }
  | {
      type: EStoreActionTypeLogin.checkout;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      remember?: TLoginRemember;
      routeCurrent?: string;
    }
  | {
      type: EStoreActionTypeLogin.success;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      remember?: TLoginRemember;
      routeCurrent?: string;
    }
  | {
      type: EStoreActionTypeLogin.error;
      logged?: boolean;
      request?: TStoreLoginRequest;
      response?: TStoreLoginResponse;
      message?: string;
      error?: boolean;
      routeRedirect?: string;
      userTemp?: TLoginUser;
      remember?: TLoginRemember;
      routeCurrent?: string;
    };

export const initialLoginState: TStoreLoginState = {
  type: EStoreActionTypeLogin.login,
  logged: false,
  message: undefined,
  error: false,
};
