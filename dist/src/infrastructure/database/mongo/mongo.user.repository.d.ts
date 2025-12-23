import { Model } from 'mongoose';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { MongoUserDocument } from './mongo.user.schema';
export declare class MongoUserRepository implements UserRepository {
    private readonly model;
    constructor(model: Model<MongoUserDocument>);
    findById(id: number): Promise<User | null>;
    findByName(name: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
}
