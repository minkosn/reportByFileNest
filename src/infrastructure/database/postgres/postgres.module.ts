
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

import { PostgresUserEntity } from './postgres.user.entity';
import { PostgresPersonEntity } from './postgres.person.entity';
import { PostgresAuthEntity } from './postgres.auth.entity';
import { PostgresFileActionEntity } from './file-action/postgres.file.action.entity';
import { PostgresFileDetailEntity } from './file-detail/postgres.file.detail.entity';
import { PostgresFileToActionEntity } from './file-to-action/postgres.file.to.action.entity';

import { PostgresFactory } from './postgres.factory';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
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
                    PostgresFileToActionEntity
                ],
                synchronize: false,
            })
        }),
        TypeOrmModule.forFeature([
            PostgresUserEntity,
            PostgresPersonEntity,
            PostgresAuthEntity,
            PostgresFileActionEntity,
            PostgresFileDetailEntity,
            PostgresFileToActionEntity
        ])
    ],
    providers: [
        PostgresFactory
    ],
    exports: [
        PostgresFactory
    ]
})
export class PostgresModule {}