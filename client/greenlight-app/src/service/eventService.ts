import {envConfig} from 'config/envConfig';
import {HttpOptions, HttpResponse} from 'domain/types/THttp';
import {getRequest} from 'utils/service.https';

export const listEvent = async () => {
  const options: HttpOptions = {
    path: `${envConfig.API_URL}/evento`,
  };

  const response: HttpResponse = await getRequest(options, {limit: 20});
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
