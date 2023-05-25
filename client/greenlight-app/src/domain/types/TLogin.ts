export type TLoginUser = {
  _id?: string;
  date?: Date;
  mail?: string;
  password?: string;
  name?: string;
  photoBase64?: string;
  token?: string;
  refreshKey?: string;
};

export type TLoginRemember = {
  rememberLogin?: boolean;
  mail?: string;
  password?: string;
};
