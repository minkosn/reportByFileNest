import { User } from './user.entity';

// interface used to allow flexible usage of different type DB repos (postgres or mongo, ...)
export interface UserRepository {
    findByName(userName: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}
