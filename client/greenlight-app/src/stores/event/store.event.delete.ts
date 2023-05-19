import * as eventService from '@service/eventService';
import {call, put} from 'redux-saga/effects';

import {
  EActionTypeEventDelete,
  TEventDeleteState,
  TStoreEventDeleteRequest,
  TStoreEventDeleteResponse,
  eventDeleteStateInitialState,
} from '@domain/types/TStates';
import {ActionEventList} from '@stores/event/store.event.list';

const serviceEventDelete = (state = eventDeleteStateInitialState, payload: TEventDeleteState) => {
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

function* eventDeleteSagas(dataStore: TEventDeleteState): Generator<any> {
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

    yield put(
      ActionEventList({
        usuarioId: dataStore.request?.usuarioId || '-1',
        categoriaId: undefined,
      }),
    );
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventDeleteRootReducers = {eventDelete: serviceEventDelete};
export const eventDeleteRootSagas = [
  {name: EActionTypeEventDelete.execute, data: eventDeleteSagas},
];
