import {call, put} from 'redux-saga/effects';
import * as eventService from '@service/eventService';

import {
  TStoreEventAddRequest,
  TStoreEventAddResponse,
  TStoreEventAddState,
} from '@domain/types/TStates';
import {pushHistory} from '@stores/store.history';

const name = 'API-EVENT-ADD';

export enum EActionTypeEventAdd {
  execute = `${name}_EXECUTE`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

const initialState: TStoreEventAddState = {
  loading: false,
  loaded: false,
  message: undefined,
  error: false,
};

type TEventAddAction =
  | {
      type: EActionTypeEventAdd.execute;
      request?: TStoreEventAddRequest;
      response?: TStoreEventAddResponse;
    }
  | {
      type: EActionTypeEventAdd.success;
      request?: TStoreEventAddRequest;
      response?: TStoreEventAddResponse;
      message?: string;
    }
  | {
      type: EActionTypeEventAdd.error;
      request?: TStoreEventAddRequest;
      response?: TStoreEventAddResponse;
      message?: string;
    };

const serviceEventAdd = (state = initialState, payload: TEventAddAction) => {
  switch (payload.type) {
    case EActionTypeEventAdd.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EActionTypeEventAdd.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EActionTypeEventAdd.error:
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

export const eventAddRootReducers = {serviceEventAdd};

export const ActionEventAdd = (request?: TStoreEventAddRequest) => ({
  type: EActionTypeEventAdd.execute,
  request,
});

export const ActionEventAddSuccess = (response: TStoreEventAddResponse) => ({
  type: EActionTypeEventAdd.success,
  response,
});

export const ActionEventAddError = (message: string, response: TStoreEventAddResponse) => ({
  type: EActionTypeEventAdd.error,
  response,
  message,
});

function* eventAddSagas(dataStore: TEventAddAction): Generator<any> {
  const request = dataStore.request;

  try {
    if (!request) {
      // aplicar erro
      return;
    }

    const response: any = yield call(eventService.addEvent, request);
    console.log(response);
    // if (!response.error) {
    //   yield put(ActionEventAddSuccess(response));
    //   yield put(
    //     pushHistory({
    //       route: '/EventView',
    //       data: response,
    //     }),
    //   );
    // }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventAddRootSagas = [{name: EActionTypeEventAdd.execute, data: eventAddSagas}];
