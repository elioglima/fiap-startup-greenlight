import * as eventService from '@service/eventService';
import {call, put} from 'redux-saga/effects';

import {TListEventAPIResponse} from '@domain/types/TAPIListEvent';
import {TListItems} from '@domain/types/TListItems';
import {
  EStoreActionTypeEventList,
  TStoreEventListRequest,
  TStoreEventListResponse,
  TStoreEventListState,
  eventListStateInitial,
} from '@domain/types/TStates';
import {showModaLoading} from '@stores/modals/store.modal.loading';
import {pushHistory} from '@stores/store.history';

const serviceEventList = (state = eventListStateInitial, payload: TStoreEventListState) => {
  switch (payload.type) {
    case EStoreActionTypeEventList.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EStoreActionTypeEventList.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EStoreActionTypeEventList.error:
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

export const ActionEventList = (request?: TStoreEventListRequest) => ({
  type: EStoreActionTypeEventList.execute,
  request,
});

export const ActionEventListSuccess = (response: TStoreEventListResponse) => ({
  type: EStoreActionTypeEventList.success,
  response,
});

export const ActionEventListError = (message: string, response: TStoreEventListResponse) => ({
  type: EStoreActionTypeEventList.error,
  response,
  message,
});

function* eventListSagas(dataStore: TStoreEventListState): Generator<any> {
  const request: TStoreEventListRequest | undefined = dataStore.request;

  try {
    const rowsAPI: any = yield call(eventService.listEvent, request || {});
    const rows: TListItems[] = rowsAPI
      ? rowsAPI.map((d: TListEventAPIResponse) => ({
          id: d._id,
          title: d.titulo,
          date: d.data,
          timeStart: d.tempo,
          photoBase64: d.fotoBase64,
          local: d.local,
          category: {
            id: d.categoria?._id,
            description: d.categoria?.titulo,
          },
          participants: d?.participantes?.map(p => ({
            _id: p._id,
            usuarioId: p.usuarioId,
            description: p.descricao,
            date: p.data,
            name: p.nome,
            mail: p.email,
            photoBase64: p.fotoBase64,
          })),
        }))
      : [];

    if (rows.length === 0) {
      yield put(showModaLoading({title: 'Ops,', description: 'Nenhum evento localizado....'}));
      yield put(
        pushHistory({
          route: '/HomeLogged',
          data: rows,
        }),
      );
      return;
    }
    yield put(ActionEventListSuccess({rows: rows || []}));
    yield put(
      pushHistory({
        route: '/EventView',
        data: rows,
      }),
    );
  } catch (error) {
    console.log(error);
  }
  return;
}

export const eventListRootReducers = {eventList: serviceEventList};
export const eventListRootSagas = [{name: EStoreActionTypeEventList.execute, data: eventListSagas}];
