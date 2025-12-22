import { Module } from '@nestjs/common';
import { AppController } from './interfaces/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './domain/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';
//
//import { FilesModule } from './files/files.module';
//import { ReportsModule } from './reports/reports.module';
//import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot(),
    UserModule
    // AuthModule,
    // FilesModule,
    // ReportsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
