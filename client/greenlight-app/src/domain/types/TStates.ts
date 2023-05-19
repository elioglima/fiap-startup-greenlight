// category

import {TListItems} from '@domain/types/TListItems';
import {TMenuItem} from '@domain/types/TMenuItem';

export type TStoreCategoryRequest = {};
export type TStoreCategoryResponse = {
  rows: TMenuItem[];
};
export type TStoreCategoryState = {
  type?: string;
  loading: boolean;
  loaded: boolean;
  message?: any;
  error?: boolean;
  request?: TStoreCategoryRequest;
  response?: TStoreCategoryResponse;
};

/* STATE LIST EVENT */

const storeEventList = 'API-EVENT-LIST';

export type TStoreEventListRequest = {
  usuarioId?: string;
  categoriaId?: string;
  categoriaTitle?: string;
};

export type TStoreEventListResponse = {
  rows: TListItems[];
};

export enum EStoreActionTypeEventList {
  execute = `${storeEventList}_EXECUTE`,
  success = `${storeEventList}_SUCCESS`,
  error = `${storeEventList}_ERROR`,
}

export type TStoreEventListState =
  | {
      type: EStoreActionTypeEventList.execute;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    }
  | {
      type: EStoreActionTypeEventList.success;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    }
  | {
      type: EStoreActionTypeEventList.error;
      request?: TStoreEventListRequest;
      response?: TStoreEventListResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    };

export const eventListStateInitial: TStoreEventListState = {
  type: EStoreActionTypeEventList.success,
  loading: false,
  loaded: false,
  error: false,
};

/* STATE COUNT EVENT */

const storeEventListCount = 'API-EVENT-LIST-COUNT';
export enum EStoreActionTypeEventListCount {
  execute = `${storeEventListCount}_EXECUTE`,
  success = `${storeEventListCount}_SUCCESS`,
  error = `${storeEventListCount}_ERROR`,
}

export type TStoreEventListCountRequest = {
  usuarioId?: string;
  categoriaId?: string;
  categoriaTitle?: string;
};

export type TStoreEventListCountResponse = {
  length: number;
};

export type TStoreEventListCountState =
  | {
      type: EStoreActionTypeEventListCount.execute;
      request?: TStoreEventListCountRequest;
      response?: TStoreEventListCountResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    }
  | {
      type: EStoreActionTypeEventListCount.success;
      request?: TStoreEventListCountRequest;
      response?: TStoreEventListCountResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    }
  | {
      type: EStoreActionTypeEventListCount.error;
      request?: TStoreEventListCountRequest;
      response?: TStoreEventListCountResponse;

      loading: boolean;
      loaded: boolean;
      message?: string;
      error: boolean;
    };

export const eventListCountStateInitial: TStoreEventListCountState = {
  type: EStoreActionTypeEventListCount.success,
  loading: false,
  loaded: false,
  error: false,
};

/* STATE ADD EVENTS */

export type TStoreEventAddRequest = {
  id: string;
  usuarioId: string;
  categoriaId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isLoadevents?: boolean;
};

export type TStoreEventAddResponse = {
  error: boolean;
  length: number;
  data: any;
};

export type TStoreEventAddState = {
  type?: string;
  loading: boolean;
  loaded: boolean;
  message?: any;
  error?: boolean;
  request?: TStoreEventAddRequest;
  response?: TStoreEventAddResponse;
};

/* STATE DELETE EVENTS */

const storeEventDeleteName = 'API-EVENT-DELETE';

export enum EActionTypeEventDelete {
  execute = `${storeEventDeleteName}_EXECUTE`,
  success = `${storeEventDeleteName}_SUCCESS`,
  error = `${storeEventDeleteName}_ERROR`,
}

export type TStoreEventDeleteRequest = {
  id: string;
  usuarioId?: string;
};

export type TStoreEventDeleteResponse = {
  error: boolean;
  length: number;
  data: any;
};

export type TStoreEventDelete = {
  type?: string;
  loading: boolean;
  loaded: boolean;
  message?: any;
  error?: boolean;
  request?: TStoreEventDeleteRequest;
  response?: TStoreEventDeleteResponse;
};

export type TEventDeleteState =
  | {
      type: EActionTypeEventDelete.execute;
      loading: boolean;
      loaded: boolean;
      message?: any;
      error?: boolean;

      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
    }
  | {
      type: EActionTypeEventDelete.success;
      loading: boolean;
      loaded: boolean;
      message?: any;
      error?: boolean;

      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
    }
  | {
      type: EActionTypeEventDelete.error;
      loading: boolean;
      loaded: boolean;
      message?: any;
      error?: boolean;

      request?: TStoreEventDeleteRequest;
      response?: TStoreEventDeleteResponse;
    };

export const eventDeleteStateInitialState: TEventDeleteState = {
  type: EActionTypeEventDelete.execute,
  loading: false,
  loaded: false,
  message: undefined,
  error: false,
};
