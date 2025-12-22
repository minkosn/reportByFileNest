import { UserRepository } from '../../domain/user/user.repository';

export interface DatabaseFactory {
    createUserRepository(): UserRepository; 
    // later: createReportRepository(), createFileRepository(), etc.
}