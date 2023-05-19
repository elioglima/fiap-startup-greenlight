import {
  EActionTypeLogin,
  TModalLoadingData,
  TModalLoadingState,
  modalLoadingInitialState,
} from '@domain/types/TModalLoading';

export const showModaLoading = (data: TModalLoadingData) => {
  return {
    type: EActionTypeLogin.show,
    data,
  };
};

export const closeModaLoading = () => ({
  type: EActionTypeLogin.close,
});

const modalReducerLoading = (state = modalLoadingInitialState, payload: TModalLoadingState) => {
  switch (payload.type) {
    case EActionTypeLogin.show:
      return {...state, data: {...payload.data}, show: true};
    case EActionTypeLogin.close:
      return {...state, data: {...payload.data}, show: false};
    default:
      return state;
  }
};

export const modalLoadingRootReducers = {modalLoading: modalReducerLoading};
