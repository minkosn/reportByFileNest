import { Person } from 'src/domain/person/person.entity';
import { PersonRepository } from 'src/domain/person/person.repository';
import { PostgresPersonEntity } from './postgres.person.entity';
import { Repository } from 'typeorm';

export class PostgresPersonRepository implements PersonRepository {
    constructor(private readonly repo: Repository<PostgresPersonEntity>) {}

    getAllPersons(): Promise<Person[]> {
        return this.repo.find();
    }
    getPersonByName(name: string): Promise<Person[]> {
        return this.repo.find({ where: [{ first_name: name }, { last_name: name }] });
    }
}
