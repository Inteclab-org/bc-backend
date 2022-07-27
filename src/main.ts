import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'authorization',
        type: 'apiKey',
        in: 'header',
      },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api-swagger', app, document);

  await app.init();
  await app.listen(3000);
}

bootstrap();
