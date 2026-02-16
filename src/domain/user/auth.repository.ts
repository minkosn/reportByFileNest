export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    username: string;
    hashedPassword: string;
}

/**
 * Interface for Authentication data access layer.
 * Handles user creation (auth specific) and token management.
 */
export interface AuthRepository {
    /**
     * Creates a new user/customer with authentication details.
     * @param params The user creation parameters.
     */
    addCustomer(params: CreateUserParams): Promise<number>;

    /**
     * Finds a user ID by email.
     */
    getUserIdByEmail(email: string): Promise<number | null>;

    /**
     * Stores a token for a specific user.
     * @param userId The numeric ID of the user.
     */
    addTokenToUser(tokenType: string, userId: number, token: string): Promise<void>;

    /**
     * Retrieves token information for a user.
     * @returns Array of objects containing the token user identifier. Returns empty array if not found.
     */
    getTokenUser(tokenType: string, userId: number, token: string): Promise<{ token_user: string }[]>;

    /**
     * Updates the password and clears the reset token.
     */
    setPasswordAndClearResetToken(hashedPassword: string, userId: number): Promise<void>;

    /**
     * Retrieves a token by its value and type.
     * @returns Array of objects containing the token user identifier.
     */
    getToken(tokenType: string, token: string): Promise<{ token_user: string }[]>;
}
