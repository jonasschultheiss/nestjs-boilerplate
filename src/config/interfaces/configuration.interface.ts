import IAuth0Configuration from './auth0-configuration.interface';
import ISwaggerConfiguration from './swagger-configuration.interface';

export default interface IConfiguration {
  appEnv: string;
  port: number;
  swagger: ISwaggerConfiguration;
  auth0: IAuth0Configuration;
}
