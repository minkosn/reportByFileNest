import { Readable } from 'stream';
import { FileLoadOptions } from './utility-classes/file-load.types';
export declare class FileLoadService {
    private options;
    constructor(options: FileLoadOptions);
    static fromUploadFile(filePath: string): FileLoadService;
    static fromStreamFile(fileStream: Readable): FileLoadService;
    static fromStreamFileInMemory(fileBuffer: Buffer): FileLoadService;
    getOptions(): FileLoadOptions;
    loadFileFromUpload(): void;
    loadFile(): void;
}
