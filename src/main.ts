import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder().setTitle('Nest Store API').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
