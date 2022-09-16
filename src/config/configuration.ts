import IConfiguration from './interfaces/configuration.interface';

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appEnv: process.env.APP_ENV,
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    tags: process.env.SWAGGER_TAGS,
    path: process.env.SWAGGER_PATH
  },
  auth0: {
    issuerURL: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE
  }
});
