
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

import { PostgresUserEntity } from './postgres.user.entity';
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
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [PostgresUserEntity],
                synchronize: true,
            })
        }),
        TypeOrmModule.forFeature([PostgresUserEntity])
    ],
    providers: [
        PostgresFactory
    ],
    exports: [
        PostgresFactory
    ]
})
export class PostgresModule {}