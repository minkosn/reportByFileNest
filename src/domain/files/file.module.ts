import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { FileService } from './file.service';
import { FileActionService } from './file-action/file.action.service';
import { FileToActionService } from './file-to-action/file.to.action.service';
import { FileDetailService } from './file-detail/file.detail.service';
import { FilesController } from '../../interfaces/http/file/file.controller';


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
    controllers: [FilesController],
    providers: [FileService, FileActionService, FileToActionService, FileDetailService],
    exports: [FileService/*, FileActionService, FileToActionService, FileDetailService*/]
})
export class FileModule {};