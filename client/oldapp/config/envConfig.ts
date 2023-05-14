import processConfig from 'react-native-config';
import {TEnvConfig} from 'domain/types/TEnvConfig';

export const envConfig: TEnvConfig = {
  API_URL: processConfig?.API_URL,
};
