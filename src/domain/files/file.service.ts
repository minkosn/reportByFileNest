import { LoggedUser } from '../user/auth.interfaces';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger,
    NotImplementedException,
} from '@nestjs/common';
import { UploadedFileResult, FileDbFields, ImportedFileDbFields, FileDetailTypeRec } from './file.interfaces';

import { FileActionService } from './file-action/file.action.service';
import { FileActionName } from './file-action/file.action.enums';

import { FileToActionService } from './file-to-action/file.to.action.service';

import { FileDetailService } from './file-detail/file.detail.service';

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name);

    constructor(
        private readonly fileActionService: FileActionService,
        private readonly fileToActionService: FileToActionService,
        private readonly fileDetailService: FileDetailService,
    ) {}

    async uploadFiles(
        year: string,
        month: string,
        files: Express.Multer.File[],
        user: LoggedUser,
    ): Promise<UploadedFileResult> {
        this.logger.log(`Uploading ${files.length} files for ${year}-${month}`);

        if (files.length === 0) {
            throw new BadRequestException('No files uploaded.');
        }

        const newEntries: FileDetailTypeRec[] = files.map((file) => ({
            fileNameOrigin: file.originalname,
            fileName: file.filename,
            filePath: file.path,
            importDate: new Date(),
            distributor: 'N/A',
            rowCount: 0,
            year,
            month,
        }));

        //get id of file action - upload
        const [{ id }] = await this.fileActionService.getByField('name', FileActionName.UPLOAD);
        if (!id) {
            throw new NotFoundException(`File action not found: ${FileActionName.UPLOAD}`);
        }
        //write file-to-action
        const fileToActionRecord = await this.fileToActionService.createFileToAction(id, user.userId);
        if (!fileToActionRecord.id) {
            throw new InternalServerErrorException(`Error creating file to action record for action id: ${String(id)}`);
        }
        //write file-details
        await this.fileDetailService.add(FileActionName.UPLOAD, fileToActionRecord.id, newEntries);

        this.logger.log('Files uploaded successfully');

        return {
            message: 'Files uploaded successfully',
            files: files.map((file) => ({
                name: file.originalname,
                path: file.path,
            })),
        };
    }

    async getUploadedFiles(): Promise<FileDbFields[]> {
        throw new NotImplementedException();
    }

    async getImportedFiles(): Promise<ImportedFileDbFields[]> {
        throw new NotImplementedException();
    }

    async clearUploadFolder(): Promise<void> {
        throw new NotImplementedException();
    }
}
