import {envConfig} from '@configs/envConfig';
import {HttpOptions, HttpResponse} from '@domain/types/THttp';
import {TMenuItem} from '@domain/types/TMenuItem';
import {TStoreCategoryRequest} from '@domain/types/TStates';
import {getRequest} from '@utils/service.https';

export const listCategory = async (
  request?: TStoreCategoryRequest,
): Promise<TMenuItem[] | undefined> => {
  const envs = await envConfig();
  const options: HttpOptions = {
    path: `${envs.API_URL}/categoria`,
  };

  const response: HttpResponse = await getRequest(options, {
    body: request,
    limit: 20,
  });

  if (response.err) {
    return undefined;
  }

  const data = response.data;
  return data
    ? data.map((d: {_id: string; titulo: string}) => ({
        id: d._id,
        title: d.titulo,
      }))
    : [];
};
