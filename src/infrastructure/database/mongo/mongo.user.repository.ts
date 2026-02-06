// src/infrastructure/database/mongo/mongo.user.repository.ts
import { Model } from 'mongoose';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { MongoUserDocument } from './mongo.user.schema';

export class MongoUserRepository implements UserRepository {
  constructor(private readonly model: Model<MongoUserDocument>) {}

  async findById(id: number): Promise<User | null> {
    const doc = await this.model.findById(id).exec();
    if (!doc) return null;
    return new User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
  }

  async findByName(name: string): Promise<User | null> {
    const doc = await this.model.findOne({ user_name: name }).exec();
    if (!doc) return null;
    return new User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
  }

  async findAll(): Promise<User[]> {
    const docs = await this.model.find().exec();
    return docs.map((d) => new User(d.id, d.user_name, d.user_password, d.user_inserted_on, d.userupdated_on, d.status));
  }

  async save(user: User): Promise<User> {
    const doc = await this.model
      .findByIdAndUpdate(
        user.getId(),
        { ...user as object },
        { upsert: true, new: true },
      )
      .exec();
    return new User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
  }
}
