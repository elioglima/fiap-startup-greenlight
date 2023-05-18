import {HttpOptions, HttpRequestMethodEnum, HttpResponse} from '@domain/types/THttp';
import axios from 'axios';
import querystring from 'querystring';

export default async (options: HttpOptions, data?: any): Promise<HttpResponse> => {
  try {
    let response: HttpResponse;

    const opt: HttpOptions = {
      timeout: 120000,
      ...options,
      headers: {
        'content-type': 'application/json',
        // ...(options.headers ? options.headers : {}),
      },
    };

    // remover cabelhos proibidos
    delete opt.headers.Host;
    delete opt.headers['User-Agent'];
    delete opt.headers['Postman-Token'];

    if (opt.method === HttpRequestMethodEnum.GET) {
      const queryString = Object.keys(data).length ? `?${querystring.encode(data)}` : '';
      const uri = `${opt.path}${queryString}`;
      response = await axios.get(uri, opt);
    } else if (opt.method === HttpRequestMethodEnum.POST) {
      const payload: any = typeof data === 'string' ? JSON.parse(data) : data;
      response = await axios.post(opt.path, payload, opt);
    } else if (opt.method === HttpRequestMethodEnum.PUT) {
      const payload: any = typeof data === 'string' ? JSON.parse(data) : data;
      response = await axios.put(opt.path, payload, opt);
    } else if (opt.method === HttpRequestMethodEnum.DELETE) {
      const queryString = Object.keys(data).length ? `?${querystring.encode(data)}` : '';
      const uri = `${opt.path}${queryString}`;
      response = await axios.delete(uri, opt);
    } else {
      return {
        err: true,
        statusCode: 422,
        status: 422,
        data: {
          message: 'Method undefined',
          statusCode: 422,
          status: 422,
        },
      };
    }

    const statusCode = response?.statusCode || response.status || 500;

    return {
      err: (statusCode && ![200, 201].includes(statusCode)) || false,
      statusCode: statusCode,
      status: statusCode,
      data: response.data,
    };
  } catch (error: any) {
    // console.log('error', error.response);
    let message: any = error?.response?.statusText || error?.response?.data || 'unexpected error';
    if (Array.isArray(error?.response?.data)) {
      message = error?.response?.data[0];
    }

    return {
      err: true,
      statusCode: error?.response?.status,
      status: error?.response?.status,
      data: {
        statusCode: error?.response?.status,
        status: error?.response?.status,
        message,
        ...(error.response.data || {}),
      },
    };
  }
};
