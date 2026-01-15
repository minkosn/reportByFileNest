import { Module } from '@nestjs/common';
import { AppController } from './interfaces/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './domain/user/user.module';
import { PersonModule } from './domain/person/person.module';
//import { FilesModule } from './files/files.module';
//import { ReportsModule } from './reports/reports.module';
//import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './infrastructure/database/db.module';
import { AuthGuard } from './domain/user/auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    PersonModule,
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UserModule
    
    // AuthModule,
    // FilesModule,
    // ReportsModule
],
  controllers: [AppController],
  providers: [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
    AppService
],
})
export class AppModule {}
