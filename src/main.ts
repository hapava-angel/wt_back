import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');


  const config = new DocumentBuilder()
    .setTitle('Audio Generation AI project')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  const port = parseInt(process.env.PORT);
  console.log('port = ', process.env.PORT);
  const server = process.env.SERVER;
  await app.listen(port, server);

  

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
