import { ILoggedUser } from '../user/auth.interfaces';
import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { IUploadedFileResult, IFileDBFields, IImportedFileDBFields } from './file.interfaces';

import { FileActionService } from './file-action/file.action.service';
import { FileActionName, FileActionStatus } from './file-action/file.action.enums';
import { FILE_ACTION_NAME } from './file-action/file.action.constants';

import { FileToActionService } from './file-to-action/file.to.action.service';

@Injectable()   
export class FileService {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly fileActionService: FileActionService,
        private readonly fileToActionService: FileToActionService
    ) {};

    async uploadFiles(year: string, month: string, files: Array<Express.Multer.File>, user: ILoggedUser) : Promise<IUploadedFileResult> {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded.');
        }

        const newEntries = files.map(file => ({
            originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'),
            fileName: file.filename,
            path: file.path,
            importDate: new Date(),
            distributor: 'N/A',
            rowCount: 0,
            year,
            month
        }));

        //get id of file action - upload
        const [{file_action_id, ...restFileAction}, ...rest] = await this.fileActionService.getByField(FILE_ACTION_NAME, FileActionName.UPLOAD);

        //write file-to-action
        const fileToActionRecord = await this.fileToActionService.createFileToAction(file_action_id, user.userId);

        //write file-details

        // Save file upload trace to the database
        //await this.fileRepository.traceFileUpload(newEntries); 

        return {
            message: 'Files uploaded successfully',
            files: files.map(file => ({
                name: file.originalname,
                path: file.path
            }))
        };
    }

    async getUploadedFiles(): Promise<IFileDBFields[]> {
        return this.fileRepository.getUploadedFiles();
    }

    async getImportedFiles(): Promise<IImportedFileDBFields[]> {
        return this.fileRepository.getImportedFiles(); 
    }

    async clearUploadFolder(): Promise<void> {
        return this.fileRepository.clearUploadFolder();
    }
}  