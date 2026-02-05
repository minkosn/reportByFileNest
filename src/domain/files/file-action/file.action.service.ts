
import { Inject, Injectable } from '@nestjs/common';
import { FILE_ACTION_REPOSITORY } from '../../../infrastructure/database/db.tokens' 
import { FileActionEntity} from './file.action.entity';
import { FileActionName, FileActionStatus } from './file.action.enums';
import { FileActionRepository } from './file.action.repository';
import { DetailTypeValue } from '../file.interfaces';

/*The service will be used initial stage when have to add actions 
- in process of work to deactivate or reactivate some action
- to get data by some action
*/


@Injectable()
export class FileActionService {
    
    constructor(
        @Inject(FILE_ACTION_REPOSITORY)
        private readonly fileActionRepository: FileActionRepository
    ){};
    // create a new file action record
    //fileActionData -accept only keys exiting in the class entity
    async createFileAction(fileActionData: { [K in keyof FileActionEntity]: FileActionEntity[K] }) {
        return this.fileActionRepository.create(fileActionData);
    };
    // retrieve a file action by its name, or all file actions
    async getByField(fieldName?: keyof FileActionEntity, value?: DetailTypeValue) {
        return fieldName 
            ? this.fileActionRepository.getByField(fieldName, value) 
            : this.fileActionRepository.findAll();
    };

    // update action name status
    async updateFileActionStatus(fileActionName: FileActionName, status: FileActionStatus, updatedBy: number) {
        return this.fileActionRepository.updateStatus(fileActionName, status, updatedBy);
    };
}