import {call, put} from 'redux-saga/effects';
import * as eventService from '@service/eventService';

import {
  TStoreEventListRequest,
  TStoreEventListResponse,
  TStoreEventListState,
} from '@domain/types/TStates';
import {TListItems} from '@domain/types/TListItems';
import {pushHistory} from '@stores/store.history';

const name = 'API-EVENT';

export enum EActionTypeEventList {
  execute = `${name}_EXECUTE`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

const initialState: TStoreEventListState = {
  loading: false,
  loaded: false,
  message: undefined,
  error: false,
};

type TEventListAction =
  | {
      type: EActionTypeEventList.execute;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;
    }
  | {
      type: EActionTypeEventList.success;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;
      message?: string;
    }
  | {
      type: EActionTypeEventList.error;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;
      message?: string;
    };

const serviceEventList = (state = initialState, payload: TEventListAction) => {
  switch (payload.type) {
    case EActionTypeEventList.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EActionTypeEventList.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EActionTypeEventList.error:
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

export const eventListRootReducers = {serviceEventList};

export const ActionEventList = (request?: TStoreEventListRequest) => ({
  type: EActionTypeEventList.execute,
  request,
});

export const ActionEventListSuccess = (response: TStoreEventListResponse) => ({
  type: EActionTypeEventList.success,
  response,
});

export const ActionEventListError = (message: string, response: TStoreEventListResponse) => ({
  type: EActionTypeEventList.error,
  response,
  message,
});

function* eventListSagas(dataStore: TEventListAction): Generator<any> {
  const request: TStoreEventListRequest | undefined = dataStore.request;

  try {
    const rows: any = yield call(eventService.listEvent, request || {});
    if (rows) {
      yield put(ActionEventListSuccess({rows: rows || []}));
      yield put(
        pushHistory({
          route: '/EventView',
          data: rows,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventListRootSagas = [{name: EActionTypeEventList.execute, data: eventListSagas}];
