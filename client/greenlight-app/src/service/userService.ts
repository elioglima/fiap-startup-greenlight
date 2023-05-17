import {envConfig} from '@configs/envConfig';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {TLoginRequest} from '@domain/types/TLogin';
import {postRequest} from '@utils/service.https';

export const login = async (request: TLoginRequest) => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/usuario/acesso`,
  };
  const response: HttpResponse = await postRequest(options, request);

  if (response.err) {
    return undefined;
  }

  return response.data?.data;
};
