import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Page } from './misc/page';
import { sanitizeXSS } from './misc/sanitize-xss.middleware';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const configService = app.get(ConfigService);

  app.use(helmet());
  app.use(json());

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } })
  );
  app.enableVersioning({
    type: VersioningType.URI
  });

  app.use(sanitizeXSS);

  bootstrapSwagger(app, configService);

  const port = configService.getOrThrow('port');
  await app.listen(port, '0.0.0.0');
}
bootstrap();

function bootstrapSwagger(app: INestApplication, configService: ConfigService): void {
  const config = new DocumentBuilder()
    .setTitle(configService.getOrThrow('swagger.title'))
    .setDescription(configService.getOrThrow('swagger.description'))
    .setVersion(configService.getOrThrow('swagger.version'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter auth0 JWT token',
        in: 'header'
      },
      'JWT-auth'
    )
    .build();

  configService
    .get('swagger.tags')
    .split('-')
    .forEach(tag => config.tags.push(tag));

  const document = SwaggerModule.createDocument(app, config, { extraModels: [Page] });
  SwaggerModule.setup(configService.getOrThrow('swagger.path'), app, document);
}
