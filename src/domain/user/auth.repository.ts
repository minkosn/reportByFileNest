import { RegisterDto } from '../../interfaces/http/user/dto/register.dto';
import { LoginDto } from '../../interfaces/http/user/dto/login.dto';
import { ResetPasswordDto } from '../../interfaces/http/user/dto/reset-password.dto';
import { UpdatePasswordDto } from '../../interfaces/http/user/dto/update-password.dto';

export type AddCustomer = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    username: string;
    hashedPassword: string;
}

export interface AuthRepository {
    /*register(registerDto: RegisterDto): Promise<void>;
    
    login(loginDto: LoginDto): Promise<{ token: string; userId: any; }> ;

    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> ;

    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{ message: string; }> ;

    getUserById(id: any): Promise<any> ;

    verifyResetPasswordToken(token: string): Promise<{ userId: any; }>;
    */
    addCustomer(newCustomer : AddCustomer): Promise<BigInteger>;

    getUserIdByEmail(email: string): Promise<any>;

    addTokenToUser(tokenType: string , userId: string, token: string): Promise<void>;

    getTokenUser(tokenType: string, userId: string, token: string): Promise<{token_user: string}[] | null>;

    setPasswordAndClearResetToken(hashedPassword: string, userId: string): Promise<void>;

    get_token(tokenType: string, token: string): Promise<{token_user: string}[] | null>;

}