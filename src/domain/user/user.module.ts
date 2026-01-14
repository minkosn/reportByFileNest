import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from '../../interfaces/http/user/user.controller';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
        }),
  ],  
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
  
})
export class UserModule {};