// Polyfill for global crypto object. Required for @nestjs/typeorm v11.
// import { webcrypto } from 'crypto';
//(globalThis as any).crypto ??= webcrypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import {
    FRONTEND_URL_KEY,
    DEFAULT_FRONTEND_URL,
    METHOD_ALLOWED_FE_CORS,
    PORT_APP,
    DEFAULT_PORT_APP,
    GLOBAL_API_PREFIX,
} from './constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log(`NestFactory.create done`);

    const configService = app.get(ConfigService);

    const feUrl = configService.get(FRONTEND_URL_KEY) || DEFAULT_FRONTEND_URL;

    const cors_methods = configService.get(METHOD_ALLOWED_FE_CORS);

    //allow FE localhost:8080 to access BE
    app.enableCors({
        credentials: true,
        origin: feUrl,
        methods: cors_methods,
    });

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix(GLOBAL_API_PREFIX);

    const port = configService.get(PORT_APP) || DEFAULT_PORT_APP;
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err: unknown) => {
    console.error('Failed to start application:', JSON.stringify(err));
    process.exit(1);
});
