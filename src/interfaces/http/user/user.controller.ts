import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { AuthService } from 'src/domain/user/auth.service';
import { User } from 'src/domain/user/user.entity';

import { UserDto } from './dto/user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isPublic } from '../../decorators/public.decorator';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    //User CRUD operations
    @Get()
    async findAll(): Promise<User[] | null> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUserById(parseInt(id));
    }

    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<User | null> {
        return this.userService.getUserByName(name);
    }

    @Post()
    async create(@Body() userDto: UserDto): Promise<User> {
        const user = new User(0, userDto.username, userDto.password, new Date(), new Date(), 'new');
        return this.userService.createUser(user);
    }

    // user Auth
    @isPublic()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @isPublic()
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
}
