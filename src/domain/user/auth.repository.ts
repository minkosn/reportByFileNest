export type AddCustomer = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    username: string;
    hashedPassword: string;
}

export interface AuthRepository {
    addCustomer(newCustomer : AddCustomer): Promise<BigInteger>;

    getUserIdByEmail(email: string): Promise<any>;

    addTokenToUser(tokenType: string , userId: string, token: string): Promise<void>;

    getTokenUser(tokenType: string, userId: string, token: string): Promise<{token_user: string}[] | null>;

    setPasswordAndClearResetToken(hashedPassword: string, userId: string): Promise<void>;

    get_token(tokenType: string, token: string): Promise<{token_user: string}[] | null>;

}