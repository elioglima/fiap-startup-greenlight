export type TLoginUser = {
  _id?: string;
  data?: Date;
  email?: string;
  nome?: string;
};

export type TLoginRequest = {
  rememberLogin: string;
  email: string;
  senha: string;
};

export type TLoginResponse = {
  user?: TLoginUser;
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
};
