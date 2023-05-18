export type TLoginUser = {
  _id?: string;
  data?: Date;
  email?: string;
  nome?: string;
  token?: string;
  refreshKey?: string;
};

export type TLoginRequest = {
  rememberLogin: boolean;
  email: string;
  senha: string;
};

export type TLoginResponse = {
  user?: TLoginUser;
  rememberLogin?: boolean;
  email?: string;
  senha?: string;
};

export type TLoginAccess = {
  logged?: boolean;
  user?: TLoginUser;
  message?: string;
  error?: boolean;
};

export type TLoginState = {
  logged?: boolean;
  request?: TLoginRequest;
  response?: TLoginResponse;
  message?: string;
  error?: boolean;
  routeRedirect?: string;
  userTemp?: TLoginUser;
};
