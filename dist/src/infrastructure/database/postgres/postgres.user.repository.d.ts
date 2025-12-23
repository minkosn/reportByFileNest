import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { Repository } from 'typeorm';
import { PostgresUserEntity } from './postgres.user.entity';
export declare class PostgresUserRepository implements UserRepository {
    private readonly repo;
    constructor(repo: Repository<PostgresUserEntity>);
    findByName(userName: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}
