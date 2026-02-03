
import { FileActionEntity} from './file.action.entity';
import { FileActionStatus, FileActionName  } from './file.action.enums';
import { IFileRepository } from '../file.interfaces';

export interface FileActionRepository extends IFileRepository<FileActionEntity> {
    //update the status of a file action by its name. 
    //updatedBy - current user that made the change 
    updateStatus(FileActionName: FileActionName, status: FileActionStatus, updatedBy: number): Promise<FileActionEntity>;
}
