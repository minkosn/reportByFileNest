// Polyfill for global crypto object. Required for @nestjs/typeorm v11.
import { webcrypto } from 'crypto';
(globalThis as any).crypto ??= webcrypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  console.log(`Bootstrap in`);

  const app = await NestFactory.create(AppModule);
  console.log(`NestFactory.create done`);


  app.enableCors({ 
    credentials: true,
    origin: 'http://localhost:8080',
    methods: ['GET','POST','PUT','DELETE']
});
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
