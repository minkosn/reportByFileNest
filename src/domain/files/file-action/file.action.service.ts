import { Inject, Injectable, Logger } from '@nestjs/common';
import { FILE_ACTION_REPOSITORY } from '../../../infrastructure/database/db.tokens';
import { FileActionEntity } from './file.action.entity';
import { FileActionName, FileActionStatus } from './file.action.enums';
import { FileActionRepository } from './file.action.repository';
import { FileActionType } from '../file.interfaces';

@Injectable()
export class FileActionService {
    private readonly logger = new Logger(FileActionService.name);

    constructor(
        @Inject(FILE_ACTION_REPOSITORY)
        private readonly fileActionRepository: FileActionRepository,
    ) {}

    /**
     * Creates a new file action record.
     * @param fileActionData The entity data.
     */
    async createFileAction(fileActionData: FileActionEntity): Promise<FileActionEntity> {
        this.logger.log(`Creating file action: ${fileActionData.name}`);
        return this.fileActionRepository.create(fileActionData);
    }

    /**
     * Retrieve a file action by its field, or all file actions.
     */
    async getByField(fieldName?: keyof FileActionEntity, value?: FileActionType): Promise<FileActionEntity[]> {
        if (fieldName && value !== undefined) {
            return this.fileActionRepository.getByField(fieldName, value);
        }
        return this.fileActionRepository.findAll();
    }

    /**
     * Update action status.
     */
    async updateFileActionStatus(
        fileActionName: FileActionName,
        status: FileActionStatus,
        updatedBy: number,
    ): Promise<FileActionEntity> {
        this.logger.log(`Updating status for action ${fileActionName} to ${status}`);
        return this.fileActionRepository.updateStatus(fileActionName, status, updatedBy);
    }
}
