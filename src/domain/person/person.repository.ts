import { Person } from './person.entity';

/**
 * Interface for Person data access layer.
 * Decouples domain service from specific database implementations.
 */
export interface PersonRepository {
    /**
     * Retrieves all person records.
     * @returns A list of persons.
     */
    getAllPersons(): Promise<Person[]>;

    /**
     * Searches for persons by name.
     * @param name The name to search for.
     * @returns A list of persons matching the name.
     */
    getPersonByName(name: string): Promise<Person[]>;
}
