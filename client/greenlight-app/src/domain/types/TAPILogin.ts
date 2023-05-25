export type TAPILoginRequest = {
  rememberLogin: boolean;
  email: string;
  senha: string;
};

export type TAPILoginResponse = {
  _id?: string;
  date?: Date;
  mail?: string;
  name?: string;
  photoBase64?: string;
  token?: string;
  refreshKey?: string;
};
