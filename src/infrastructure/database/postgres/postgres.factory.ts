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

import { PostgresFileActionEntity } from './file-action/postgres.file.action.entity';
import { PostgresFileActionRepository } from './file-action/postgres.file.action.repository';
import { FileActionRepository } from 'src/domain/files/file-action/file.action.repository';

import { FileDetailRepository } from 'src/domain/files/file-detail/file.detail.repository';
import { PostgresFileDetailEntity } from './file-detail/postgres.file.detail.entity';
import { PostgresFileDetailRepository } from './file-detail/postgres.file.detail.repository';

import { FileToActionRepository } from 'src/domain/files/file-to-action/file.to.action.repository';
import { PostgresFileToActionEntity } from './file-to-action/postgres.file.to.action.entity';
import { PostgresFileToActionRepository } from './file-to-action/postgres.file.to.action.repository';

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
        
        //File Action Repo
        @InjectRepository(PostgresFileActionEntity)
        private readonly fileActionRepo: Repository<PostgresFileActionEntity>,

        //File Detail Repo
        @InjectRepository(PostgresFileDetailEntity)
        private readonly fileDetailRepo: Repository<PostgresFileDetailEntity>,

        //File To Action Repo
        @InjectRepository(PostgresFileToActionEntity)
        private readonly fileToActionRepo: Repository<PostgresFileToActionEntity>,

        //Data Source        
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

    createFileActionRepository() : FileActionRepository {
        return new PostgresFileActionRepository(this.fileActionRepo);
    }

    createFileToActionRepository(): FileToActionRepository {
        return new PostgresFileToActionRepository(this.fileToActionRepo);
    }

    createFileDetailRepository(): FileDetailRepository {
        return new PostgresFileDetailRepository(this.fileDetailRepo);
    };
            

        
};