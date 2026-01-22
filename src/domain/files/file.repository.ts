import { IFileDBFields, IFileUpload, IImportedFileDBFields } from './file.interfaces';

export interface FileRepository {
    traceFileUpload(newEntries: IFileUpload[]): Promise<void>;
    getUploadedFiles(): Promise<IFileDBFields[]>;
    getImportedFiles(): Promise<IImportedFileDBFields[]>;
    clearUploadFolder(): Promise<void>;
}