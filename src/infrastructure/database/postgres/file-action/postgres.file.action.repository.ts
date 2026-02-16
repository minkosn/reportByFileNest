import { FileActionEntity } from 'src/domain/files/file-action/file.action.entity';
import { FileActionName, FileActionStatus } from 'src/domain/files/file-action/file.action.enums';
import { FileActionRepository } from '../../../../domain/files/file-action/file.action.repository';
import { PostgresFileActionEntity } from './postgres.file.action.entity';
import { Repository } from 'typeorm';
import { FileActionType } from 'src/domain/files/file.interfaces';

export class PostgresFileActionRepository implements FileActionRepository {
    constructor(private readonly repo: Repository<PostgresFileActionEntity>) {}

    create(entity: PostgresFileActionEntity) {
        return this.repo.save(entity);
    }

    async getByField(fieldName: string, value: FileActionType): Promise<PostgresFileActionEntity[]> {
        const result = await this.repo.findBy({ [fieldName]: value });
        return result;
    }

    findAll(): Promise<PostgresFileActionEntity[]> {
        return this.repo.find();
    }

    updateStatus(
        FileActionName: FileActionName,
        status: FileActionStatus,
        updatedBy: number,
    ): Promise<FileActionEntity> {
        return this.repo.save({
            name: FileActionName,
            status: status,
            updatedBy: updatedBy,
        });
    }
}
