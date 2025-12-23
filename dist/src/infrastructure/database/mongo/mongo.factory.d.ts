import { Model } from 'mongoose';
import { DatabaseFactory } from '../db-factory.interface';
import { UserRepository } from '../../../domain/user/user.repository';
import { MongoUserDocument } from './mongo.user.schema';
export declare class MongoFactory implements DatabaseFactory {
    private readonly userModel;
    constructor(userModel: Model<MongoUserDocument>);
    createUserRepository(): UserRepository;
}
