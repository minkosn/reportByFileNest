import { FileActionName, FileActionStatus } from './file-action/file.action.enums';

//file interfaces 
export interface IFileRepository<TEntity = any> {
    create(entity: TEntity): Promise<TEntity>;
    
    //get instance as 'fieldName' is filename from the correct passed class, 'value' si some value from the instances by this field
    getByField<K extends keyof TEntity>(fieldName: K, value: TEntity[K]): Promise<TEntity[]>;
    
    //get all instances from current used entity class
    findAll(): Promise<TEntity[]>;
}

export interface IFileDetailType {
    //On upload
    file_name: string;
    file_name_origin: string;
    file_path: string;
    
    distributor: string;
    year: string;
    month: string;
    
    //On import
    batch_id: string;
};  

export type FileActionType = number | FileActionStatus | Date | FileActionName | undefined;
export type FileDetailTypeType = number | string | FileActionStatus | Date | FileActionName | undefined;
export type FileDetailType = number | string | undefined;
export type FileToActionDataType = number | Date | undefined;


//handleFileUpload
export interface IFileDBFields {
    originalName: string;
    fileName: string;
    filePath: string;
    importDate: Date;
    distributor: string;
    rowCount?: number;
    batchId?: string;
} 

export interface IFileUpload extends IFileDBFields {
        year: string,
        month: string
}

export interface IUploadedFileResult {
    message: string;
    files: { name: string; path: string }[];
}

export interface IImportedFileDBFields extends Pick<IFileDBFields, 'importDate' | 'distributor' | 'rowCount' |'originalName'> {
    init(): Promise<void>;
}


