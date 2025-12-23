import { UserService } from 'src/domain/user/user.service';
import { User } from 'src/domain/user/user.entity';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByName(name: string): Promise<User>;
    create(userDto: UserDto): Promise<User>;
}
