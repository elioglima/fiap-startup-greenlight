import * as eventService from '@service/eventService';
import {call, put} from 'redux-saga/effects';

import {
  TStoreEventDeleteRequest,
  TStoreEventDeleteResponse,
  TStoreEventDeleteState,
} from '@domain/types/TStates';

const name = 'API-EVENT-ADD';

export enum EActionTypeEventDelete {
  execute = `${name}_EXECUTE`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

const initialState: TStoreEventDeleteState = {
  loading: false,
  loaded: false,
  message: undefined,
  error: false,
};

type TEventAddAction =
  | {
      type: EActionTypeEventDelete.execute;
      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
    }
  | {
      type: EActionTypeEventDelete.success;
      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
      message?: string;
    }
  | {
      type: EActionTypeEventDelete.error;
      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
      message?: string;
    };

const serviceEventDelete = (state = initialState, payload: TEventAddAction) => {
  switch (payload.type) {
    case EActionTypeEventDelete.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EActionTypeEventDelete.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EActionTypeEventDelete.error:
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

export const eventDeleteRootReducers = {serviceEventDelete};

export const ActionEventDelete = (request?: TStoreEventDeleteRequest) => ({
  type: EActionTypeEventDelete.execute,
  request,
});

export const ActionEventDeleteSuccess = (response: TStoreEventDeleteResponse) => ({
  type: EActionTypeEventDelete.success,
  response,
});

export const ActionEventDeleteError = (message: string, response: TStoreEventDeleteResponse) => ({
  type: EActionTypeEventDelete.error,
  response,
  message,
});

function* eventDeleteSagas(dataStore: TEventAddAction): Generator<any> {
  const request: any = {
    id: dataStore.request?.id,
  };

  try {
    if (!request) {
      // aplicar erro
      return;
    }

    const response: any = yield call(eventService.deleteEvent, request);
    if (!response.error) {
      yield put(ActionEventDeleteSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventDeleteRootSagas = [
  {name: EActionTypeEventDelete.execute, data: eventDeleteSagas},
];
