import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {all, takeEvery} from 'redux-saga/effects';

import {configsRootReducers} from '@stores/store.configs';
import {eventAddRootReducers, eventAddRootSagas} from '../stores/event/store.event.add';
import {
  eventListCountRootReducers,
  eventListCountRootSagas,
} from '../stores/event/store.event.count';
import {eventDeleteRootReducers, eventDeleteRootSagas} from '../stores/event/store.event.delete';
import {eventListRootReducers, eventListRootSagas} from '../stores/event/store.event.list';
import {loginRootReducers, loginRootSagas} from '../stores/login/store.login';
import {modalLoadingRootReducers} from '../stores/modals/store.modal.loading';
import {historyRootReducers} from '../stores/store.history';
import {categoryRootReducers, categoryRootSagas} from '../stores/store.service.category';

export function* rootSaga() {
  yield all([
    ...loginRootSagas.map(f => takeEvery(f.name, f.data)),
    ...categoryRootSagas.map(f => takeEvery(f.name, f.data)),
    ...eventListRootSagas.map(f => takeEvery(f.name, f.data)),
    ...eventAddRootSagas.map(f => takeEvery(f.name, f.data)),
    ...eventDeleteRootSagas.map(f => takeEvery(f.name, f.data)),
    ...eventListCountRootSagas.map(f => takeEvery(f.name, f.data)),
  ]);
}

const rootReducer = combineReducers({
  ...loginRootReducers,
  ...historyRootReducers,
  ...categoryRootReducers,
  ...eventListRootReducers,
  ...eventAddRootReducers,
  ...eventDeleteRootReducers,
  ...modalLoadingRootReducers,
  ...eventListCountRootReducers,
  ...configsRootReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export type TAppState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
