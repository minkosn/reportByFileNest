/**
 * Represents the response payload for a successfully logged-in user.
 */
export interface LoggedUser {
    /**
     * The JWT access token used for subsequent authenticated requests.
     */
    token: string;
    /**
     * The unique numeric identifier of the user.
     */
    userId: number;
}
