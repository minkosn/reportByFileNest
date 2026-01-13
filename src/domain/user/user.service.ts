import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from '../../infrastructure/database/db.tokens';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly users: UserRepository
    ) {};

    getUserByName(userName: string): Promise<User | null> {
        return this.users.findByName(userName);
    }    

    getUserById(userId: number): Promise<User | null> {
        return this.users.findById(userId);
    }

    getAllUsers(): Promise<User[] | null> {
        return this.users.findAll();
    }
    
    createUser(user: User): Promise<User> {
        return this.users.save(user);
    }

}