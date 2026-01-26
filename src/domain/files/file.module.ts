import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { FileService } from './file.service';
import { FileActionService } from './file-action/file.action.service';
import { FileToActionService } from './file-to-action/file.to.action.service';


@Module({
    imports: [
            ConfigModule,
            DatabaseModule.forRoot(),
            MulterModule.registerAsync({
                  imports: [ConfigModule],
                  useFactory: async (configService: ConfigService) => ({
                    dest: './uploads',
                  }),
                  inject: [ConfigService],
                }),
    ],
    providers: [FileService, FileActionService, FileToActionService],
    exports: [FileService]
})
export class FileModule {};