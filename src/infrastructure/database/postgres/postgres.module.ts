import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service'; 

import { PostgresUserEntity } from './user/postgres.user.entity';
import { PostgresPersonEntity } from './person/postgres.person.entity';
import { PostgresAuthEntity } from './user/postgres.auth.entity';
import { PostgresFileActionEntity } from './file-action/postgres.file.action.entity';
import { PostgresFileDetailEntity } from './file-detail/postgres.file.detail.entity';
import { PostgresFileToActionEntity } from './file-to-action/postgres.file.to.action.entity';
import { PostgresFileDetailTypeEntity } from './file-detail-type/postgres.file.detail.type.entity';

import { PostgresFactory } from './postgres.factory';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: parseInt(configService.get('DB_PORT')),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    PostgresUserEntity,
                    PostgresPersonEntity,
                    PostgresAuthEntity,
                    PostgresFileActionEntity,
                    PostgresFileDetailEntity,
                    PostgresFileToActionEntity,
                    PostgresFileDetailTypeEntity,
                ],
                synchronize: false,
            }),
        }),
        TypeOrmModule.forFeature([
            PostgresUserEntity,
            PostgresPersonEntity,
            PostgresAuthEntity,
            PostgresFileActionEntity,
            PostgresFileDetailEntity,
            PostgresFileToActionEntity,
            PostgresFileDetailTypeEntity,
        ]),
    ],
    providers: [PostgresFactory],
    exports: [PostgresFactory],
})
export class PostgresModule {}
