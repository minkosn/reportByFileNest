import { PersonRepository } from '../../../domain/person/person.repository';
import { Model } from 'mongoose';
import { MongoPersonDocument } from './mongo.person.schema';
import { Person } from '../../../domain/person/person.entity';

export class MongoPersonRepository implements PersonRepository {
    constructor(private readonly personModel: Model<MongoPersonDocument>) {}

    async getAllPersons(): Promise<Person[]> {
        const docs = await this.personModel.find().exec();
        return docs.map((doc) => new Person(doc.id, doc.first_name, doc.last_name, doc.birth_date));
    }

    async getPersonByName(name: string): Promise<Person[]> {
        return this.personModel
            .find({
                $or: [{ first_name: name }, { last_name: name }],
            })
            .exec();
    }
}
