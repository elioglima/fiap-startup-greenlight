const name = 'MODAL-LOADING';

export enum EActionTypeLogin {
  show = `${name}_SHOW`,
  close = `${name}_CLOSE`,
}

export type TModalLoadingData = {
  title?: string;
  description?: string;
};

export type TModalLoading = {
  show?: boolean;
  data?: TModalLoadingData;
};

export type TModalLoadingState =
  | {type: EActionTypeLogin.show; data?: TModalLoadingData; show: boolean}
  | {type: EActionTypeLogin.close; data?: TModalLoadingData; show: boolean};

export const modalLoadingInitialState: TModalLoadingState = {
  type: EActionTypeLogin.close,
  show: false,
};
