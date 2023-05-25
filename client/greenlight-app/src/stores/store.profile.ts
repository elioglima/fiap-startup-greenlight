import * as userService from '@service/userService';
import {call, put} from 'redux-saga/effects';

import {
  EStoreActionTypeProfile,
  TStoreProfileRequest,
  TStoreProfileResponse,
  TStoreProfileState,
  profileStateInitial,
} from '@domain/types/TStates';

const reducerProfile = (state = profileStateInitial, payload: TStoreProfileState) => {
  switch (payload.type) {
    case EStoreActionTypeProfile.upload:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EStoreActionTypeProfile.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EStoreActionTypeProfile.error:
      return {
        ...state,
        response: payload.response,
        message: payload.message,
        loading: false,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
};

export const ActionProfileUpload = (request?: TStoreProfileRequest) => ({
  type: EStoreActionTypeProfile.upload,
  request,
});

export const ActionProfileSuccess = (response?: TStoreProfileResponse) => ({
  type: EStoreActionTypeProfile.success,
  response,
});

export const ActionProfileError = (message: string, response?: TStoreProfileResponse) => ({
  type: EStoreActionTypeProfile.error,
  response,
  message,
});

function* profileSagas(dataStore: TStoreProfileState): Generator<any> {
  const request: TStoreProfileRequest | undefined = dataStore.request;

  try {
    if (!request) {
      yield put(ActionProfileError('Upload fail'));
      return;
    }

    const response: any = yield call(userService.profileUpload, request);
    yield put(ActionProfileSuccess(response));
  } catch (error) {
    console.log(error);
  }
  return;
}

export const profileRootReducers = {profile: reducerProfile};
export const profileRootSagas = [{name: EStoreActionTypeProfile.upload, data: profileSagas}];
