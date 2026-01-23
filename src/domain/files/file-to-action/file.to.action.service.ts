import { Inject, Injectable } from '@nestjs/common';
import { FileToActionRepository } from './file.to.action.repository';
import { FileToActionEntity } from './file.to.action.entity';
import { FILE_TO_ACTION_REPOSITORY } from '../../../infrastructure/database/db.tokens' 


@Injectable()
export class FileToActionService {
    constructor(
        @Inject(FILE_TO_ACTION_REPOSITORY)
        private readonly fileToActionRepository: FileToActionRepository
    ){};

    // create a record for file action
    async createFileToAction(actionId: number, performedById: number): Promise<FileToActionEntity> {
        return this.fileToActionRepository.create({
            file_to_action_action: actionId,
            file_to_action_performed_By: performedById,
            file_to_action_date: new Date()
        });
    }
    
    async getFileToActionByActionId(actionId: number): Promise<FileToActionEntity[]> {
        return this.fileToActionRepository.getByField('file_to_action_action', actionId);
    }
 
    
    
}