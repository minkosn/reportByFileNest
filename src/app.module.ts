import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './interfaces/app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { UserModule } from './domain/user/user.module';
import { PersonModule } from './domain/person/person.module';
import { FileModule } from './domain/files/file.module';
import { DatabaseModule } from './infrastructure/database/db.module';
import { AuthGuard } from './domain/user/auth.guard';
import { ConfigService } from './config/config.service';
//import { ReportsModule } from './reports/reports.module';
//import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        UserModule,
        PersonModule,
        FileModule,
        // ReportsModule
        // AuthModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AppService,
    ],
})
export class AppModule {}
