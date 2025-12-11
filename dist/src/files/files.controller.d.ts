import { FilesService } from './files.service';
import { UploadDto } from './dto/upload.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFiles(files: Array<Express.Multer.File>, uploadDto: UploadDto, req: any): Promise<{
        message: string;
        files: {
            name: string;
            path: any;
        }[];
    }>;
    importFiles(): Promise<unknown>;
    clear(): Promise<void>;
    getImportedFiles(): Promise<{
        importDate: any;
        distributor: any;
        rowCount: any;
        originalName: any;
    }[]>;
    getUploadedFiles(): Promise<{
        importDate: any;
        distributor: any;
        rowCount: any;
        originalName: any;
        fileName: any;
        filePath: any;
        batchId: any;
    }[]>;
}
