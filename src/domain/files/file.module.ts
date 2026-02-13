import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { FileService } from './file.service';
import { FileActionService } from './file-action/file.action.service';
import { FileToActionService } from './file-to-action/file.to.action.service';
import { FileDetailService } from './file-detail/file.detail.service';
import { FileDetailTypeService } from './file-detail-type/file.detail.type.service';
import { FilesController } from '../../interfaces/http/file/file.controller';

@Module({
    imports: [
        ConfigModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                dest: configService.get('UPLOAD_DEST') || './uploads',
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [FilesController],
    providers: [FileService, FileActionService, FileToActionService, FileDetailService, FileDetailTypeService],
    exports: [FileService],
})
export class FileModule {}
