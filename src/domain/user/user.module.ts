import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from '../../interfaces/http/user/user.controller';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    ConfigModule
  ],  
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
  
})
export class UserModule {};