import * as eventService from '@service/eventService';
import {call, put} from 'redux-saga/effects';

import {
  EStoreActionTypeEventListCount,
  TStoreEventListCountRequest,
  TStoreEventListCountResponse,
  TStoreEventListCountState,
  eventListCountStateInitial,
} from '@domain/types/TStates';

const serviceEventListCount = (
  state = eventListCountStateInitial,
  payload: TStoreEventListCountState,
) => {
  switch (payload.type) {
    case EStoreActionTypeEventListCount.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EStoreActionTypeEventListCount.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EStoreActionTypeEventListCount.error:
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

export const ActionEventListCount = (request?: TStoreEventListCountRequest) => ({
  type: EStoreActionTypeEventListCount.execute,
  request,
});

export const ActionEventListCountSuccess = (response: TStoreEventListCountResponse) => ({
  type: EStoreActionTypeEventListCount.success,
  response,
});

export const ActionEventListCountError = (
  message: string,
  response: TStoreEventListCountResponse,
) => ({
  type: EStoreActionTypeEventListCount.error,
  response,
  message,
});

function* eventListSagas(dataStore: TStoreEventListCountState): Generator<any> {
  const request: TStoreEventListCountRequest | undefined = dataStore.request;
  try {
    const response: any = yield call(eventService.listEventCount, request || {});
    if (!response.error) {
      yield put(ActionEventListCountSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventListCountRootReducers = {eventListCount: serviceEventListCount};
export const eventListCountRootSagas = [
  {name: EStoreActionTypeEventListCount.execute, data: eventListSagas},
];
