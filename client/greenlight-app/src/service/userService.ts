import {envConfig} from '@configs/envConfig';
import {TAPILoginRequest} from '@domain/types/TAPILogin';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {TStoreProfileResponse} from '@domain/types/TStates';
import {postRequest, putRequest} from '@utils/service.https';

export const login = async (request: TAPILoginRequest) => {
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

export const loginRefresh = async (request: {token: string; refreshKey: string}) => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/usuario/acesso`,
  };
  const response: HttpResponse = await putRequest(options, request);

  if (response.err) {
    return undefined;
  }

  return response.data?.data;
};

export const profileUpload = async (request: {
  photoBase64: string;
  usuarioId: string;
}): Promise<TStoreProfileResponse> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/usuario/foto?id=${request.usuarioId}`,
  };
  const response: HttpResponse = await putRequest(options, {fotoBase64: request.photoBase64});
  return response.data as TStoreProfileResponse;
};
