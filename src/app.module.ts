import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { FilesModule } from './files/files.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ConfigModule, AuthModule, FilesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
