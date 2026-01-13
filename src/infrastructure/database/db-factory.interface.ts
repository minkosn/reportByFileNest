import { UserRepository } from '../../domain/user/user.repository';
import { PersonRepository } from '../../domain/person/person.repository';
export interface DatabaseFactory {
    createUserRepository(): UserRepository; 
    createPersonRepository(): PersonRepository;
    // later: createReportRepository(), createFileRepository(), etc.
}