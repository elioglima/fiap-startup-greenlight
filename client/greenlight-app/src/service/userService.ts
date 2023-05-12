import {envConfig} from 'config/envConfig';
import {HttpOptions, HttpResponse} from 'domain/types/THttp';
import {postRequest} from 'utils/service.https';

export const login = async (data: any) => {
  const options: HttpOptions = {
    path: `${envConfig.API_URL}/usuario/acesso`,
  };
  console.log(options);
  const response: HttpResponse = await postRequest(options, data);
  if (response.err) {
    return undefined;
  }
  return response.data?.data;
};
