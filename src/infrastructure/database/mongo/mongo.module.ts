// src/infrastructure/database/mongo/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import {
  MongoUser,
  MongoUserSchema,
} from './mongo.user.schema';
import { MongoFactory } from './mongo.factory';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('uri'),
      }),
    }),
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: MongoUserSchema },
    ]),
  ],
  providers: [MongoFactory],
  exports: [MongoFactory],
})
export class MongoModule {}
