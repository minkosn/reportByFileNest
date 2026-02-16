import { Injectable, Inject, Logger } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';
import { PERSON_REPOSITORY } from '../../infrastructure/database/db.tokens';

@Injectable()
export class PersonService {
    private readonly logger = new Logger(PersonService.name);

    constructor(
        @Inject(PERSON_REPOSITORY)
        private readonly personRepository: PersonRepository,
    ) {}

    async getAllPersons(): Promise<Person[]> {
        return this.personRepository.getAllPersons();
    }

    /**
     * Search by first and last name.
     * @param name The name to search for.
     */
    async getPersonByName(name: string): Promise<Person[]> {
        this.logger.debug(`Searching for person with name: ${name}`);
        return this.personRepository.getPersonByName(name);
    }
}
