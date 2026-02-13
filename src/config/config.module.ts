import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Global()
@Module({
    imports: [
        // apply env file usage
        NestConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
