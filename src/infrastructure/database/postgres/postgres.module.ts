
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

import { PostgresUserEntity } from './postgres.user.entity';
import { PostgresPersonEntity } from './postgres.person.entity';

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
                entities: [PostgresUserEntity, PostgresPersonEntity],
                synchronize: false,
            })
        }),
        TypeOrmModule.forFeature([PostgresUserEntity, PostgresPersonEntity])
    ],
    providers: [
        PostgresFactory
    ],
    exports: [
        PostgresFactory
    ]
})
export class PostgresModule {}