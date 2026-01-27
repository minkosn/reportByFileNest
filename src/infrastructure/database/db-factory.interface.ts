import { UserRepository } from '../../domain/user/user.repository';
import { PersonRepository } from '../../domain/person/person.repository';
import { AuthRepository } from '../../domain/user/auth.repository';
import { FileActionRepository } from '../../domain/files/file-action/file.action.repository';
import { FileToActionRepository } from '../../domain/files/file-to-action/file.to.action.repository';
import { FileDetailRepository } from '../../domain/files/file-detail/file.detail.repository';
export interface DatabaseFactory {
    createUserRepository(): UserRepository; 
    createPersonRepository(): PersonRepository;
    createAuthRepository(): AuthRepository;
    createFileActionRepository(): FileActionRepository;
    createFileToActionRepository(): FileToActionRepository;
    createFileDetailRepository(): FileDetailRepository;

    
    // later: createReportRepository(), createFileRepository(), etc.
}