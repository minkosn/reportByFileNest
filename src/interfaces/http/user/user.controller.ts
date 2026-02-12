import { Controller, Get, Param, Post, Body, Res, HttpStatus  } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from '../../../domain/user/user.service';
import { AuthService } from '../../../domain/user/auth.service';
import { User } from '../../../domain/user/user.entity';

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
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(loginDto);
        
        return res
            .status(HttpStatus.OK)
            .send(result);
        //return this.authService.login(loginDto);
    }

    //It's not public intentionally , the forgotten password users have to contact admin to solve the issue
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res: Response) {
        await this.authService.resetPassword(resetPasswordDto);
        return res.status(HttpStatus.ACCEPTED).send();
    }

    @Post('update-password')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Res() res: Response) {
        const result = await this.authService.updatePassword(updatePasswordDto);
        return res.status(HttpStatus.OK).send(result);
    }
}
