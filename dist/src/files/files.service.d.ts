import { Pool } from 'pg';
export declare class FilesService {
    private db;
    constructor(db: Pool);
    handleFileUpload(year: string, month: string, files: Array<Express.Multer.File>, user: any): Promise<{
        message: string;
        files: {
            name: string;
            path: any;
        }[];
    }>;
    runImportWorker(): Promise<unknown>;
    getUploadedFiles(): Promise<{
        importDate: any;
        distributor: any;
        rowCount: any;
        originalName: any;
        fileName: any;
        filePath: any;
        batchId: any;
    }[]>;
    getImportedFiles(): Promise<{
        importDate: any;
        distributor: any;
        rowCount: any;
        originalName: any;
    }[]>;
    clearUploads(): Promise<void>;
}
