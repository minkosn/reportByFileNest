import { FileActionEntity } from './file.action.entity';
import { FileActionStatus, FileActionName } from './file.action.enums';
import { FileRepository } from '../file.interfaces';

/**
 * Interface for FileAction data access layer.
 */
export interface FileActionRepository extends FileRepository<FileActionEntity> {
    /**
     * Updates the status of a file action by its name.
     * @param FileActionName The name of the action to update.
     * @param status The new status.
     * @param updatedBy The ID of the user making the change.
     */
    updateStatus(
        FileActionName: FileActionName,
        status: FileActionStatus,
        updatedBy: number,
    ): Promise<FileActionEntity>;
}
