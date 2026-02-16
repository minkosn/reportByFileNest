import { Inject, Injectable, Logger } from '@nestjs/common';
import { FileDetailTypeRepository } from './file.detail.type.repository';
import { FILE_DETAIL_TYPE_REPOSITORY } from '../../../infrastructure/database/db.tokens';
import { FileDetailTypeEntity } from './file.detail.type.entity';
import { FileDetailType } from '../file.interfaces';

@Injectable()
export class FileDetailTypeService {
    private readonly logger = new Logger(FileDetailTypeService.name);

    constructor(
        @Inject(FILE_DETAIL_TYPE_REPOSITORY)
        private readonly fileDetailTypeRepository: FileDetailTypeRepository,
    ) {}

    /**
     * Creates a new file detail type record.
     * @param fileDetailTypeEntity The entity to create.
     */
    async createFileDetailType(fileDetailTypeEntity: FileDetailTypeEntity): Promise<FileDetailTypeEntity> {
        this.logger.log(`Creating file detail type for data: ${fileDetailTypeEntity.data}`);
        return this.fileDetailTypeRepository.create(fileDetailTypeEntity);
    }

    /**
     * Finds a file detail type record by its type.
     * @param type The type to search for.
     */
    async getFileDetailTypeByType(type: FileDetailType): Promise<FileDetailTypeEntity | null> {
        this.logger.debug(`Searching for file detail type: ${String(type)}`);
        return this.fileDetailTypeRepository.findByType(type);
    }
}
