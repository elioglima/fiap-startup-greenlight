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

// event

export type TStoreEventListRequest = {
  usuarioId?: string;
  categoryId?: string;
};
export type TStoreEventListResponse = {
  rows: TListItems[];
};
export type TStoreEventListState = {
  type?: string;
  loading: boolean;
  loaded: boolean;
  message?: any;
  error?: boolean;
  request?: TStoreEventListRequest;
  response?: TStoreEventListResponse;
};
