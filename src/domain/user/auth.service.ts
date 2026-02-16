import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AUTH_REPOSITORY } from '../../infrastructure/database/db.tokens';
import { AuthRepository } from './auth.repository';

import { UserService } from './user.service';

import { RegisterDto } from '../../interfaces/http/user/dto/register.dto';
import { LoginDto } from '../../interfaces/http/user/dto/login.dto';
import { ResetPasswordDto } from '../../interfaces/http/user/dto/reset-password.dto';
import { UpdatePasswordDto } from '../../interfaces/http/user/dto/update-password.dto';

import { LoggedUser } from './auth.interfaces';

export const TOKEN_RESET_TYPE = 'reset_password';

@Injectable()
export class AuthService {
    constructor(
        // inject JWToken to manage tokens
        private readonly jwtService: JwtService,
        //Inject Auth repos throught AuthRepository interface
        @Inject(AUTH_REPOSITORY)
        private readonly authRepo: AuthRepository,
        //Inject user Service to access data concerned users
        private readonly userService: UserService,
    ) {}

    async register(registerDto: RegisterDto): Promise<void> {
        const { username, password, email, firstName, lastName, birthDate } = registerDto;
        
        if (!username || !password || !email || !birthDate) {
            throw new UnauthorizedException('Missing required fields');
        }
        
        const user = await this.userService.getUserByName(username);

        if (user) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.authRepo.addCustomer({
            firstName,
            lastName,
            email,
            birthDate,
            username,
            hashedPassword,
        });

        return;
    }
    async login(loginDto: LoginDto): Promise<LoggedUser> {
        const { username, password } = loginDto;

        const user = await this.userService.getUserByName(username);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id };
        const token = this.jwtService.sign(payload);
        return { token, userId: user.id };
    }
    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { email } = resetPasswordDto;

        const userId = await this.authRepo.getUserIdByEmail(email);

        if (!userId) {
            throw new NotFoundException('User not found for the provided email');
        }

        const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
        await this.authRepo.addTokenToUser(TOKEN_RESET_TYPE, userId, token);

        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:8080';
        const resetLink = `${frontendUrl}/validate-token?token=${token}`;

        console.log(`Password reset link: ${resetLink}`);
    }
    async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
        const { token, newPassword, userId } = updatePasswordDto;

        try {
            const decoded = this.jwtService.verify<{ email: string }>(token);

            const resetTokens = await this.authRepo.getTokenUser(TOKEN_RESET_TYPE, userId, token);

            if (resetTokens?.length === 0 || !resetTokens) {
                throw new UnauthorizedException('Token not found by the user!');
            }

            const dbToken = this.jwtService.verify<{ email: string }>(resetTokens[0]?.token_user);

            if (dbToken.email !== decoded.email) {
                throw new UnauthorizedException('Invalid data in the token');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this.authRepo.setPasswordAndClearResetToken(hashedPassword, userId);

            return { message: 'Password updated successfully' };
        } catch (error) {
            if ((error as object).hasOwnProperty('type') && (error as { type: string }).type === 'DBError')
                throw new Error((error as Error).message);
            else throw new UnauthorizedException('Invalid or expired token');
        }
    }

    async verifyResetPasswordToken(token: string): Promise<{ userId: number }> {
        try {
            const decoded = this.jwtService.verify<{ email: string }>(token);
            const { email } = decoded;

            const resetTokens = await this.authRepo.getToken(TOKEN_RESET_TYPE, token);

            if (resetTokens?.length === 0 || !resetTokens) {
                throw new UnauthorizedException('Invalid or expired token');
            }

            const userId = await this.authRepo.getUserIdByEmail(email);

            if (!userId) {
                throw new NotFoundException('User not found for the provided email');
            }

            return await Promise.resolve({ userId });
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token!', JSON.stringify(error));
        }
    }
}
