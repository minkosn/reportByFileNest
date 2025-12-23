import { User } from './user.entity';
export interface UserRepository {
    findByName(userName: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}
