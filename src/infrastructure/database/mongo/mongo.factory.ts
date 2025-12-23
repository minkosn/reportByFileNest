// src/infrastructure/database/mongo/mongo.factory.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseFactory } from '../db-factory.interface';
import { UserRepository } from '../../../domain/user/user.repository';
import {
  MongoUser,
  MongoUserDocument,
} from './mongo.user.schema';
import { MongoUserRepository } from './mongo.user.repository';

@Injectable()
export class MongoFactory implements DatabaseFactory {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<MongoUserDocument>,
  ) {}

  createUserRepository(): UserRepository {
    return new MongoUserRepository(this.userModel);
  }
}
