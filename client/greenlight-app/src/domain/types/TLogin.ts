export type TLoginUser = {
  _id?: string;
  data?: Date;
  email?: string;
  nome?: string;
};

export type TLoginAccess = {
  logged?: boolean;
  user?: TLoginUser;
  message?: string;
  error?: boolean;
};
