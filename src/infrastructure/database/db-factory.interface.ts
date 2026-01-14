import { UserRepository } from '../../domain/user/user.repository';
import { PersonRepository } from '../../domain/person/person.repository';
import {  AuthRepository } from '../../domain/user/auth.repository';
export interface DatabaseFactory {
    createUserRepository(): UserRepository; 
    createPersonRepository(): PersonRepository;
    createAuthRepository(): AuthRepository;
    // later: createReportRepository(), createFileRepository(), etc.
}