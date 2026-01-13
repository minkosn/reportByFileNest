import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseFactory } from '../db-factory.interface';
import { PostgresUserEntity } from './postgres.user.entity';
import { PostgresUserRepository } from './postgres.user.repository';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/user/user.repository';
import { PersonRepository } from 'src/domain/person/person.repository';
import { PostgresPersonRepository } from './postgres.person.repository';
import { PostgresPersonEntity } from './postgres.person.entity';

@Injectable()
export class PostgresFactory implements DatabaseFactory {
    constructor(
        //User Repo
        @InjectRepository(PostgresUserEntity)
        private readonly userRepo: Repository<PostgresUserEntity>,
        
        //Person Repo
        @InjectRepository(PostgresPersonEntity)
        private readonly personRepo: Repository<PostgresPersonEntity>
    ) {};

    createUserRepository(): UserRepository {
        return new PostgresUserRepository(this.userRepo);
    }

    createPersonRepository(): PersonRepository {
        return new PostgresPersonRepository(this.personRepo);
    }
};