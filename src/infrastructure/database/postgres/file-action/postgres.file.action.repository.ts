import { FileActionEntity } from 'src/domain/files/file-action/file.action.entity';
import { FileActionName, FileActionStatus } from 'src/domain/files/file-action/file.action.enums';
import { FileActionRepository } from '../../../../domain/files/file-action/file.action.repository';
import { PostgresFileActionEntity } from './postgres.file.action.entity';
import { Repository } from 'typeorm'

export class PostgresFileActionRepository implements FileActionRepository {
    constructor(private readonly repo: Repository<PostgresFileActionEntity>){};

    create(entity: PostgresFileActionEntity) {
        return this.repo.save(entity);
    }

    async getByField(fieldName: string, value: any): Promise<PostgresFileActionEntity[]> {
        const result = await this.repo.findBy({ [fieldName]: value }); 
        return result;
    }

    findAll(): Promise<PostgresFileActionEntity[]> {
        return this.repo.find();
    }

    updateStatus(FileActionName: FileActionName, status: FileActionStatus, updatedBy: number): Promise<FileActionEntity> {
        return this.repo.save({
            file_action_name: FileActionName,
            file_action_status: status,
            file_action_updated_by: updatedBy
        });
    }
};