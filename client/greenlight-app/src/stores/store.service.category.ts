import {call, put} from 'redux-saga/effects';
import * as categoryService from '@service/categoryService';

import {
  TStoreCategoryRequest,
  TStoreCategoryResponse,
  TStoreCategoryState,
} from '@domain/types/TStates';
import {pushHistory} from '@stores/store.history';

const name = 'API-CATEGORY';

export enum EActionTypeCategory {
  execute = `${name}_EXECUTE`,
  success = `${name}_SUCCESS`,
  error = `${name}_ERROR`,
}

const initialState: TStoreCategoryState = {
  loading: false,
  loaded: false,
  message: undefined,
  error: false,
};

type TCategoryAction =
  | {
      type: EActionTypeCategory.execute;
      request?: TStoreCategoryRequest;
      response?: TStoreCategoryResponse;
    }
  | {
      type: EActionTypeCategory.success;
      request?: TStoreCategoryRequest;
      response?: TStoreCategoryResponse;
      message?: string;
    }
  | {
      type: EActionTypeCategory.error;
      request?: TStoreCategoryRequest;
      response?: TStoreCategoryResponse;
      message?: string;
    };

const serviceCategory = (state = initialState, payload: TCategoryAction) => {
  switch (payload.type) {
    case EActionTypeCategory.execute:
      return {
        ...state,
        request: payload.request,
        response: undefined,
        loaded: false,
        loading: true,
      };
    case EActionTypeCategory.success:
      return {
        ...state,
        response: payload.response,
        message: 'success',
        loaded: true,
        loading: false,
      };

    case EActionTypeCategory.error:
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

export const categoryRootReducers = {serviceCategory};

export const ActionCategory = (request?: TStoreCategoryRequest) => ({
  type: EActionTypeCategory.execute,
  request,
});

export const ActionCategorySuccess = (response: TStoreCategoryResponse) => ({
  type: EActionTypeCategory.success,
  response,
});

export const ActionCategoryError = (message: string, response: TStoreCategoryResponse) => ({
  type: EActionTypeCategory.error,
  response,
  message,
});

function* categorySagas(dataStore: TCategoryAction): Generator<any> {
  const request: TStoreCategoryRequest | undefined = dataStore.request;

  try {
    const rows: any = yield call(categoryService.listCategory, request);
    if (rows) {
      yield put(ActionCategorySuccess({rows: rows || []}));
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export const categoryRootSagas = [{name: EActionTypeCategory.execute, data: categorySagas}];
