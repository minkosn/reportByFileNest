import { UserRepository } from '../../domain/user/user.repository';
import { PersonRepository } from '../../domain/person/person.repository';
import { AuthRepository } from '../../domain/user/auth.repository';
import { FileActionRepository } from '../../domain/files/file-action/file.action.repository';
export interface DatabaseFactory {
    createUserRepository(): UserRepository; 
    createPersonRepository(): PersonRepository;
    createAuthRepository(): AuthRepository;
    createFileActionRepository(): FileActionRepository;
    
    // later: createReportRepository(), createFileRepository(), etc.
}