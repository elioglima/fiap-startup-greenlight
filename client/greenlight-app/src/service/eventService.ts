import {envConfig} from '@configs/envConfig';
import {TListEventAPIResponse, TListEventCountAPIResponse} from '@domain/types/TAPIListEvent';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {
  TStoreEventAddRequest,
  TStoreEventAddResponse,
  TStoreEventListCountRequest,
  TStoreEventListRequest,
} from '@domain/types/TStates';
import {deleteRequest, getRequest, postRequest} from '@utils/service.https';

export const listEventCount = async ({
  usuarioId,
  categoriaId,
}: TStoreEventListCountRequest): Promise<TListEventCountAPIResponse[] | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento/contagem`,
  };

  const params = {
    ...(usuarioId ? {usuarioId} : {}),
    ...(categoriaId ? {categoriaId} : {}),
  };

  const response: HttpResponse = await getRequest(options, params);

  if (response.err) {
    return undefined;
  }
  const data = response.data;
  return data || [];
};

export const listEvent = async ({
  usuarioId,
  categoriaId,
}: TStoreEventListRequest): Promise<TListEventAPIResponse[] | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const params = {
    ...(usuarioId ? {usuarioId} : {}),
    ...(categoriaId ? {categoriaId} : {}),
    limit: 20,
  };

  const response: HttpResponse = await getRequest(options, params);

  if (response.err) {
    return undefined;
  }
  const data = response.data;
  return data || [];
};

export const addEvent = async (
  dataRequest: TStoreEventAddRequest,
): Promise<TStoreEventAddResponse> => {
  const envs = await envConfig();

  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const dataAPI = {
    usuarioId: dataRequest.usuarioId,
    categoriaId: dataRequest.categoriaId,
    data: dataRequest.date,
    local: dataRequest.location,
    tempo: dataRequest.time,
    titulo: dataRequest.title,
    fotoBase64: dataRequest.photoBase64,
  };

  const response: HttpResponse = await postRequest(options, dataAPI);
  return response?.data;
};

export const deleteEvent = async (
  dataRequest: TStoreEventAddRequest,
): Promise<TStoreEventAddResponse> => {
  const envs = await envConfig();

  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const dataAPI = {
    id: dataRequest.id,
  };

  const response: HttpResponse = await deleteRequest(options, dataAPI);
  return response?.data;
};

export const getEventPhoto = async ({
  eventoId,
}: {
  eventoId: string;
}): Promise<string | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento/foto`,
  };

  const params = {
    ...(eventoId ? {eventoId} : {}),
  };

  const response: HttpResponse = await getRequest(options, params);
  if (response.err) {
    return undefined;
  }
  const data = response.data;
  return data || [];
};
