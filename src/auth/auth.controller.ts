import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Post('update-password')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        return this.authService.updatePassword(updatePasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req) {
        return this.authService.getUserById(req.user.id);
    }

    @Get('validate-token')
    async validateResetToken(@Query('token') token: string) {
        return this.authService.verifyResetPasswordToken(token);
    }
}
