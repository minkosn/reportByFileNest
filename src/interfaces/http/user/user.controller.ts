import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { User } from 'src/domain/user/user.entity';
import { UserDto } from './dto/user.dto';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(parseInt(id));
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<User> {
    return this.userService.getUserByName(name);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    const user = new User(0, userDto.username, userDto.password, new Date(), new Date(), 'new');
    return this.userService.createUser(user);
  }
}