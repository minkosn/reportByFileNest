import { Person } from '../../../../domain/person/person.entity';
import { PersonRepository } from '../../../../domain/person/person.repository';
import { PostgresPersonEntity } from './postgres.person.entity';
import { Repository } from 'typeorm';

export class PostgresPersonRepository implements PersonRepository {
    constructor(private readonly repo: Repository<PostgresPersonEntity>) {}

    async getAllPersons(): Promise<Person[]> {
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDomain(entity));
    }
    async getPersonByName(name: string): Promise<Person[]> {
        const entities = await this.repo.find({ where: [{ first_name: name }, { last_name: name }] });
        return entities.map((entity) => this.toDomain(entity));
    }

    private toDomain(entity: PostgresPersonEntity): Person {
        return new Person(entity.id, entity.first_name, entity.last_name, entity.birth_date);
    }
}
