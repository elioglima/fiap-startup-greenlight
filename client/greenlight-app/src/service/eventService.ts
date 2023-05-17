import {envConfig} from '@configs/envConfig';
import {TAddEvent} from '@domain/types/TAddEvent';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {TListItems} from '@domain/types/TListItems';
import {TStoreEventListRequest} from '@domain/types/TStates';
import {getRequest, postRequest} from '@utils/service.https';

export const listEvent = async ({
  usuarioId,
  categoryId,
}: TStoreEventListRequest): Promise<TListItems[] | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const response: HttpResponse = await getRequest(options, {
    ...(usuarioId ? {usuarioId} : {}),
    ...(categoryId ? {categoryId} : {}),
    limit: 20,
  });

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

export const serviceAddEvent = async (dataRequest: TAddEvent) => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/evento`,
  };

  const response: HttpResponse = await postRequest(options, {
    ...dataRequest,
    limit: 20,
  });
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
