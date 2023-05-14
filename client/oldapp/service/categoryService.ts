import {envConfig} from 'config/envConfig';
import {HttpOptions, HttpResponse} from 'domain/types/THttp';
import {getRequest} from 'utils/service.https';

export const listCategory = async () => {
  const options: HttpOptions = {
    path: `${envConfig.API_URL}/categoria`,
  };

  const response: HttpResponse = await getRequest(options, {limit: 20});
  if (response.err) {
    return undefined;
  }
  console.log(response.data);
  const data = response.data;
  return data
    ? data.map((d: {_id: string; titulo: string}) => ({
        id: d._id,
        title: d.titulo,
      }))
    : [];
};
