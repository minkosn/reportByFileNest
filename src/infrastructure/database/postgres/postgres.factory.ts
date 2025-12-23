import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseFactory } from '../db-factory.interface';
import { PostgresUserEntity } from './postgres.user.entity';
import { PostgresUserRepository } from './postgres.user.repository';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/user/user.repository';

@Injectable()
export class PostgresFactory implements DatabaseFactory {
    constructor(
        @InjectRepository(PostgresUserEntity)
        private readonly userRepo: Repository<PostgresUserEntity>
    ) {};

    createUserRepository(): UserRepository {
        return new PostgresUserRepository(this.userRepo);
    }
};