import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/db.module';
import { FileService } from './file.service';
import { FileActionService } from './file-action/file.action.service';
import { FileToActionService } from './file-to-action/file.to.action.service';


@Module({
    imports: [
            DatabaseModule.forRoot()
    ],
    providers: [FileService, FileActionService, FileToActionService],
    exports: [FileService]
})
export class FileModule {};