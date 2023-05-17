import {TEnvConfig} from '@domain/types/TEnvConfig';
import {envs} from './env';

export const envConfig = (): TEnvConfig => {
  const vars = {
    ...envs,
  };

  if (!vars.API_URL) {
    throw new Error('Undefined environment variable');
  }

  return vars;
};
