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
import { MongoAuthRepository } from './mongo.auth.repository';

import { AuthRepository } from '../../../domain/user/auth.repository';
import { MongoAuthEntity } from './mongo.auth.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class MongoFactory implements DatabaseFactory {
    constructor(
        @InjectModel(MongoUser.name)
        private readonly userModel: Model<MongoUserDocument>,
        @InjectModel(MongoPerson.name)
        private readonly personModel: Model<MongoPersonDocument>,
        private readonly authRepo: Repository<MongoAuthEntity>,
        private readonly dataSource: DataSource,

    ) {}

    createUserRepository(): UserRepository {
        return new MongoUserRepository(this.userModel);
    }

    createPersonRepository(): PersonRepository {
        return new MongoPersonRepository(this.personModel);
    }

    createAuthRepository() : AuthRepository {
        return new MongoAuthRepository(this.authRepo, this.dataSource);
    }
}
