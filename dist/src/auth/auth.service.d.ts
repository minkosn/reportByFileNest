import { Pool } from 'pg';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class AuthService {
    private db;
    private jwtService;
    private readonly TOKEN_RESET_TYPE;
    constructor(db: Pool, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        userId: any;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    getUserById(id: any): Promise<any>;
    verifyResetPasswordToken(token: string): Promise<{
        userId: any;
    }>;
}
