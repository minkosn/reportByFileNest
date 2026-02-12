import { ILoggedUser } from '../user/auth.interfaces';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IUploadedFileResult, IFileDBFields, IImportedFileDBFields, IFileDetailType } from './file.interfaces';

import { FileActionService } from './file-action/file.action.service';
import { FileActionName } from './file-action/file.action.enums';
import { FILE_ACTION_NAME } from './file-action/file.action.constants';

import { FileToActionService } from './file-to-action/file.to.action.service';

import { FileDetailService } from './file-detail/file.detail.service';

@Injectable()
export class FileService {
    constructor(
        private readonly fileActionService: FileActionService,
        private readonly fileToActionService: FileToActionService,
        private readonly fileDetailService: FileDetailService,
    ) {}

    async uploadFiles(
        year: string,
        month: string,
        files: Express.Multer.File[],
        user: ILoggedUser,
    ): Promise<IUploadedFileResult> {
        if (files.length === 0) {
            throw new BadRequestException('No files uploaded.');
        }

        const newEntries = files.map((file) => ({
            file_name_origin: file.originalname, //Buffer.from(file.originalname, 'latin1').toString('utf8'),
            file_name: file.filename,
            file_path: file.path,
            importDate: new Date(),
            distributor: 'N/A',
            rowCount: 0,
            year,
            month,
        }));

        // Save file upload trace to the database

        //get id of file action - upload
        const [{ file_action_id }] = await this.fileActionService.getByField(FILE_ACTION_NAME, FileActionName.UPLOAD);
        if (!file_action_id) {
            throw new NotFoundException(`File action not found: ${FileActionName.UPLOAD}`);
        }
        //write file-to-action
        const fileToActionRecord = await this.fileToActionService.createFileToAction(file_action_id, user.userId);
        if (!fileToActionRecord.file_to_action_id) {
            throw new InternalServerErrorException(`Error creating file to action record for action id: ${String(file_action_id)}`);
        }
        //write file-details
        await this.fileDetailService.add(
            FileActionName.UPLOAD,
            fileToActionRecord.file_to_action_id,
            newEntries,
        );

        return {
            message: 'Files uploaded successfully',
            files: files.map((file) => ({
                name: file.originalname,
                path: file.path,
            })),
        };
    }

    async getUploadedFiles(): Promise<IFileDBFields[]> {
        //TO DO return this.fileRepository.getUploadedFiles();
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }

    async getImportedFiles(): Promise<IImportedFileDBFields[]> {
        //TO DO return this.fileRepository.getImportedFiles();
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }

    async clearUploadFolder(): Promise<void> {
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }
}
