import {envConfig} from '@configs/envConfig';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {TListItems} from '@domain/types/TListItems';
import {
  TStoreEventAddRequest,
  TStoreEventAddResponse,
  TStoreEventListRequest,
} from '@domain/types/TStates';
import {deleteRequest, getRequest, putRequest} from '@utils/service.https';

export const listEvent = async ({
  usuarioId,
  categoryId,
}: TStoreEventListRequest): Promise<TListItems[] | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const params = {
    ...(usuarioId ? {usuarioId} : {}),
    ...(categoryId ? {categoryId} : {}),
    limit: 20,
  };

  const response: HttpResponse = await getRequest(options, params);

  if (response.err) {
    return undefined;
  }
  const data = response.data;
  return data
    ? data.map(
        (d: {
          _id: string;
          titulo: string;
          descricao: string;
          data: Date;
          horaInicio: string;
          foto: string;
          participantes: any;
        }) => ({
          id: d._id,
          title: d.titulo,
          date: d.data,
          timeStart: d.horaInicio,
          photoDataBase64: d.foto,
        }),
      )
    : [];
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
    categoryId: dataRequest.categoryId,
    data: dataRequest.date,
    local: dataRequest.location,
    tempo: dataRequest.time,
    titulo: dataRequest.title,
  };

  const response: HttpResponse = await putRequest(options, dataAPI);
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
