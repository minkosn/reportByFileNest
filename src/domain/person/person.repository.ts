import { Person } from './person.entity';

export interface PersonRepository {
    getAllPersons(): Promise<Person[]>;
    getPersonByName(name: string): Promise<Person[]>;
} 