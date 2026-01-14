import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DatabaseFactory } from '../db-factory.interface';
import { PostgresUserEntity } from './postgres.user.entity';
import { PostgresUserRepository } from './postgres.user.repository';
import { Repository, DataSource } from 'typeorm';
import { UserRepository } from 'src/domain/user/user.repository';
import { PersonRepository } from 'src/domain/person/person.repository';
import { PostgresPersonRepository } from './postgres.person.repository';
import { PostgresPersonEntity } from './postgres.person.entity';
import { AuthRepository } from 'src/domain/user/auth.repository';
import { PostgresAuthRepository } from './postgres.auth.repository';
import { PostgresAuthEntity } from './postgres.auth.entity';

@Injectable()
export class PostgresFactory implements DatabaseFactory {
    constructor(
        //User Repo
        @InjectRepository(PostgresUserEntity)
        private readonly userRepo: Repository<PostgresUserEntity>,
        
        //Person Repo
        @InjectRepository(PostgresPersonEntity)
        private readonly personRepo: Repository<PostgresPersonEntity>,

        //Auth Repo
        @InjectRepository(PostgresAuthEntity)
        private readonly authRepo: Repository<PostgresAuthEntity>,

        @InjectDataSource()
        private readonly dataSource: DataSource,

    ) {};

    createUserRepository(): UserRepository {
        return new PostgresUserRepository(this.userRepo);
    }

    createPersonRepository(): PersonRepository {
        return new PostgresPersonRepository(this.personRepo);
    }

    createAuthRepository() : AuthRepository {
        return new PostgresAuthRepository(this.authRepo, this.dataSource);
    }
};