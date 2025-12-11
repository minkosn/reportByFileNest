import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        userId: any;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    getUser(req: any): Promise<any>;
    validateResetToken(token: string): Promise<{
        userId: any;
    }>;
}
