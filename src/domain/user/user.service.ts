import { Injectable, Inject, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from '../../infrastructure/database/db.tokens';
import { User } from './user.entity';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        // inject user repo (postgres or mongo type), referenced by interface UserRepository
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async getUserByName(userName: string): Promise<User | null> {
        return this.userRepository.findByName(userName);
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.userRepository.findById(userId);
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users || [];
    }

    async createUser(user: User): Promise<User> {
        this.logger.log(`Creating user: ${user.username}`);
        return this.userRepository.save(user);
    }
}
