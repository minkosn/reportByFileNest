import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../interfaces/http/user/user.controller';
import { DatabaseModule } from '../../infrastructure/database/db.module';

@Module({
  imports: [DatabaseModule.forRoot()],  
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  
})
export class UserModule {};