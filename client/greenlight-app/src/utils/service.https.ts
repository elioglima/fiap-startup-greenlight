import {HttpOptions, HttpRequestMethodEnum, HttpResponse} from '@domain/types/THttp';
import requestAxios from './request.axios';

const request = async (options: HttpOptions, data: any): Promise<HttpResponse> => {
  return requestAxios(options, data);
};

export const postRequest = async (options: HttpOptions, body: any): Promise<HttpResponse> => {
  return request(
    {
      ...options,
      method: HttpRequestMethodEnum.POST,
    },
    body,
  );
};

export const getRequest = async (options: HttpOptions, body: any): Promise<HttpResponse> => {
  return request(
    {
      ...options,
      method: HttpRequestMethodEnum.GET,
    },
    body,
  );
};
