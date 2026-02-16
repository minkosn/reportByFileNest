import { FileActionName, FileActionStatus } from './file-action/file.action.enums';

//file interfaces
export interface FileRepository<TEntity = any> {
    create(entity: TEntity): Promise<TEntity>;

    //get instance as 'fieldName' is filename from the correct passed class, 'value' si some value from the instances by this field
    getByField<K extends keyof TEntity>(fieldName: K, value: TEntity[K]): Promise<TEntity[]>;

    //get all instances from current used entity class
    findAll(): Promise<TEntity[]>;
}

export interface FileDetailTypeRec {
    //On upload
    fileName: string;
    fileNameOrigin: string;
    filePath: string;

    distributor: string;
    year: string;
    month: string;
    importDate?: Date;
    rowCount?: number;

    //On import
    batchId?: string;
}

export type FileActionType = number | FileActionStatus | Date | FileActionName | undefined;
export type FileDetailTypeType = number | string | FileActionStatus | Date | FileActionName | undefined;
export type FileDetailType = number | string | undefined;
export type FileToActionDataType = number | Date | undefined;

//handleFileUpload
export interface FileDbFields {
    originalName: string;
    fileName: string;
    filePath: string;
    importDate: Date;
    distributor: string;
    rowCount?: number;
    batchId?: string;
}

export interface UploadedFileResult {
    message: string;
    files: { name: string; path: string }[];
}

export interface ImportedFileDbFields extends Pick<
    FileDbFields,
    'importDate' | 'distributor' | 'rowCount' | 'originalName'
> {
    init(): Promise<void>;
}
