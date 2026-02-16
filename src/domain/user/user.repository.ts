import { User } from './user.entity';

/**
 * Interface for User data access layer.
 * Allows decoupling the domain service from specific database implementations (Postgres, Mongo, etc.).
 */
export interface UserRepository {
    /**
     * Finds a user by their username.
     * @param userName The username to search for.
     * @returns The user entity if found, otherwise null.
     */
    findByName(userName: string): Promise<User | null>;

    /**
     * Finds a user by their numeric ID.
     * @param userId The ID of the user.
     * @returns The user entity if found, otherwise null.
     */
    findById(userId: number): Promise<User | null>;

    /**
     * Retrieves all users.
     * @returns A list of users. Returns an empty array if no users exist.
     */
    findAll(): Promise<User[]>;

    /**
     * Persists a user entity.
     * @param user The user entity to save.
     * @returns The saved user entity.
     */
    save(user: User): Promise<User>;
}
