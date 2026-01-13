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


import { PersonRepository } from '../../../domain/person/person.repository';
import { MongoPersonRepository } from './mongo.person.repository';
import { MongoPersonDocument, MongoPerson } from './mongo.person.schema';

@Injectable()
export class MongoFactory implements DatabaseFactory {
    constructor(
        @InjectModel(MongoUser.name)
        private readonly userModel: Model<MongoUserDocument>,
        @InjectModel(MongoPerson.name)
        private readonly personModel: Model<MongoPersonDocument>,
    ) {}

    createUserRepository(): UserRepository {
        return new MongoUserRepository(this.userModel);
    }

    createPersonRepository(): PersonRepository {
        return new MongoPersonRepository(this.personModel);
    }
}
