import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {all, takeEvery} from 'redux-saga/effects';

import {loginRootReducers, loginRootSagas} from '../stores/store.login';
import {historyRootReducers} from '../stores/store.history';
import {categoryRootReducers, categoryRootSagas} from '@stores/store.service.category';
import {eventListRootReducers, eventListRootSagas} from '@stores/store.service.event';

export function* rootSaga() {
  yield all([
    ...loginRootSagas.map(f => takeEvery(f.name, f.data)),
    ...categoryRootSagas.map(f => takeEvery(f.name, f.data)),
    ...eventListRootSagas.map(f => takeEvery(f.name, f.data)),
  ]);
}

const rootReducer = combineReducers({
  ...loginRootReducers,
  ...historyRootReducers,
  ...categoryRootReducers,
  ...eventListRootReducers,
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
