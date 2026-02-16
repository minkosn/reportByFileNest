import { Inject, Injectable, Logger } from '@nestjs/common';
import { FileToActionRepository } from './file.to.action.repository';
import { FileToActionEntity } from './file.to.action.entity';
import { FILE_TO_ACTION_REPOSITORY } from '../../../infrastructure/database/db.tokens';

@Injectable()
export class FileToActionService {
    private readonly logger = new Logger(FileToActionService.name);

    constructor(
        @Inject(FILE_TO_ACTION_REPOSITORY)
        private readonly fileToActionRepository: FileToActionRepository,
    ) {}

    /**
     * Creates a record for file action.
     * @param actionId The ID of the action.
     * @param performedById The ID of the user performing the action.
     */
    async createFileToAction(actionId: number, performedById: number): Promise<FileToActionEntity> {
        this.logger.log(`Creating file action record for action: ${actionId} by user: ${performedById}`);
        return this.fileToActionRepository.create({
            actionId,
            performedBy: performedById,
            date: new Date(),
        } as FileToActionEntity);
    }

    async getFileToActionByActionId(actionId: number): Promise<FileToActionEntity[]> {
        return this.fileToActionRepository.getByField('actionId', actionId);
    }
}
