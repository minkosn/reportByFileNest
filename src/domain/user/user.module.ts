import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../interfaces/http/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  
})
export class UserModule {};