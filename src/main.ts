if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true validator will strip validated object of any properties that do not have any decorators.
      transform: true, //The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. To enable auto-transformation, set transform to true.
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
      transformOptions: {
        enableImplicitConversion: true, //If set to true class-transformer will attempt conversion based on TS reflected type
      },
    }),
  );


  const config = new DocumentBuilder() //SWAGGER
    .setTitle('GESIMMO API')
    .setDescription('API GESIMMO')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); //localhost:3000/docs | localhost:8080/docs to get info of the API

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
