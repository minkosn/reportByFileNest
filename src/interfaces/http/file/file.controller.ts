import { Request ,Body, Controller, Post, UploadedFiles, UseInterceptors, Get } from '@nestjs/common';
import { FileService } from '../../../domain/files/file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './dto/upload.dto';
import { IUploadedFileResult } from '../../../domain/files/file.interfaces';

@Controller('file')
export class FilesController {
    constructor(private readonly fileService: FileService) {};

    // upload files endpoint
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: UploadDto, @Request() req: any) : Promise<IUploadedFileResult> {
        return this.fileService.uploadFiles(body.year, body.month, files, req.user);
    }

    // get uploaded files endpoint
    @Get('list-uploaded')
    async getUploadedFiles() {
        return this.fileService.getUploadedFiles();
    }

    // get imported files endpoint
    @Get('list-imported')
    async getImportedFiles() {
        return this.fileService.getImportedFiles();
    }

    // clear upload folder endpoint
    @Post('clear-uploads')
    async clearUploads() {
        return this.fileService.clearUploadFolder();
    }
    
    // import already uploaded files endpoint
    @Post('import-files')
    async importFiles() {
        throw new Error('Not implemented yet.');
        //return this.fileService.runImportWorker();
    }
}