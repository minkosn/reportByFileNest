import { UserRepository } from './user.repository';
import { User } from './user.entity';
export declare class UserService {
    private readonly users;
    constructor(users: UserRepository);
    getUserByName(userName: string): Promise<User | null>;
    getUserById(userId: number): Promise<User | null>;
    getAllUsers(): Promise<User[] | null>;
    createUser(user: User): Promise<User>;
}
