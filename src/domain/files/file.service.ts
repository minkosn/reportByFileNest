import { ILoggedUser } from '../user/auth.interfaces';
import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { IUploadedFileResult, IFileDBFields, IImportedFileDBFields } from './file.interfaces';

@Injectable()   
export class FileService {
    constructor(
        private readonly fileRepository: FileRepository
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

        // Save file upload trace to the database
        await this.fileRepository.traceFileUpload(newEntries); 

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