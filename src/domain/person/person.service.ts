import { Injectable, Inject } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';
import { PERSON_REPOSITORY } from '../../infrastructure/database/db.tokens' 

@Injectable()
export class PersonService {
    constructor(
        @Inject(PERSON_REPOSITORY) 
        private readonly personRepository: PersonRepository) {}

    getAllPersons(): Promise<Person[]> {
        return this.personRepository.getAllPersons();
    }
    // search by first and last name
    getPersonByName(name: string): Promise<Person[]> {
        return this.personRepository.getPersonByName(name);
    }
}