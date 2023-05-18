import {RequestOptions} from 'http';

export type HttpResponse = {
  err?: boolean;
  status?: number;
  statusCode: number;
  data?: any;
  [x: string]: any;
};

export enum HttpRequestMethodEnum {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
  PUT = 'PUT',
}

export interface IHttpRequestOptions extends RequestOptions {
  method: HttpRequestMethodEnum;
  path: string;
}

export type HttpOptions = {
  timeout?: number;
  method?: HttpRequestMethodEnum;
  path: string;
  headers?: any;
  pathParameters?: any;
  queryStringParameters?: any;
};

export type HttpRequest = {
  body?: any;
  headers?: any;
  pathParameters?: any;
  queryStringParameters?: any;
  [x: string]: any;
};

export type AuthenticatedHttpInput = HttpRequest & {
  accessToken: string;
};
