import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from '../../interfaces/http/user/user.controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [UserService, AuthService],
})
export class UserModule {}
