// src/infrastructure/database/mongo/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { MongoUser, MongoUserSchema } from './mongo.user.schema';
import { MongoPerson, MongoPersonSchema } from './mongo.person.schema';

import { MongoFactory } from './mongo.factory';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get('MONGO_URI'),
            }),
        }),
        MongooseModule.forFeature([
            { name: MongoUser.name, schema: MongoUserSchema },
            { name: MongoPerson.name, schema: MongoPersonSchema },
        ]),
    ],
    providers: [MongoFactory],
    exports: [MongoFactory],
})
export class MongoModule {}
