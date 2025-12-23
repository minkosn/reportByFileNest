import { DatabaseFactory } from '../db-factory.interface';
import { PostgresUserEntity } from './postgres.user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/user/user.repository';
export declare class PostgresFactory implements DatabaseFactory {
    private readonly userRepo;
    constructor(userRepo: Repository<PostgresUserEntity>);
    createUserRepository(): UserRepository;
}
