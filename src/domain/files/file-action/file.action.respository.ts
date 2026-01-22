
import { FileActionEntity, FileActionStatus, FileActionName } from './file.action.entity';
import { IFileRepository } from '../file.interfaces';

export interface FileActionRepository extends IFileRepository<FileActionEntity> {
    //create<FileActionEntity>(fileAction: FileActionEntity): Promise<FileActionEntity>;
    
    //get file action by some of its fields as value depend of the current field type
    //getByField<K extends keyof FileActionEntity, FileActionEntity>(fieldName: K, value: FileActionEntity[K]): Promise<FileActionEntity[]>;
    
    //update the status of a file action by its name. 
    //updatedBy - current user that made the change 
    updateStatus(FileActionName: FileActionName, status: FileActionStatus, updatedBy: number): Promise<FileActionEntity>;
    
    //findAll<FileActionEntity>(): Promise<FileActionEntity[]>;
}
