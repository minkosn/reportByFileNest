/*import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import { FileLoadOptions, FileLoadEnum } from './utility-classes/file-load.types';


@Injectable()
export class FileLoadService {
    private options : FileLoadOptions = null;

    constructor(options: FileLoadOptions) {
        this.options = options;
    }

    // Factory methods 
    static fromUploadFile(filePath: string): FileLoadService { 
        return new FileLoadService({ typeLoading: FileLoaEnum.UploadFile, filePath }); 
    } 

    static fromStreamFile(fileStream: Readable): FileLoadService { 
        return new FileLoadService({ typeLoading: FileLoaEnum.StreamFile, fileStream }); 
    }

    static fromStreamFileInMemory(fileBuffer: Buffer): FileLoadService { 
        return new FileLoadService({ typeLoading: FileLoaEnum.StreamFileInMemory, fileBuffer }); 
    }

    getOptions(): FileLoadOptions {
        return this.options;
    }


    loadFileFromUpload(): void {
        const { filePath } = this.options as { typeLoading: 'uploadFile'; filePath: string; };
        console.log(`Loading file from upload at path: ${filePath}`);
        // Implement the logic to load file from upload

    }

    loadFile(): void {
        switch (this.options.typeLoading) {
            case FileLoaEnum.UploadFile:
                this.loadFileFromUpload();
                break;
            case FileLoaEnum.StreamFile:
                this.loadFileFromStream();
                break;
            case FileLoaEnum.StreamFileInMemory:
                this.loadFileFromBuffer();
                break;
            default:
                throw new Error('Unsupported file loading type');
        }
    }
}
    */