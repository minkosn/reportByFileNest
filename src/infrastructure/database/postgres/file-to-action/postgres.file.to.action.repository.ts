import { FileToActionRepository } from '../../../../domain/files/file-to-action/file.to.action.repository';
import { FileToActionEntity } from '../../../../domain/files/file-to-action/file.to.action.entity';
import { PostgresFileToActionEntity } from './postgres.file.to.action.entity';
import { Repository } from 'typeorm';
import { FileToActionDataType } from '../../../../domain/files/file.interfaces';

export class PostgresFileToActionRepository implements FileToActionRepository {
    constructor(private readonly repo: Repository<PostgresFileToActionEntity>) {}

    async create(fileToAction: FileToActionEntity): Promise<FileToActionEntity> {
        const entity = this.repo.create({
            file_to_action_action: fileToAction.actionId,
            file_to_action_date: fileToAction.date,
            file_to_action_performed_By: fileToAction.performedBy,
        } as PostgresFileToActionEntity);
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }

    async getByField(fieldName: string, value: FileToActionDataType): Promise<FileToActionEntity[]> {
        const entities = await this.repo.findBy({ [fieldName]: value } as any);
        return entities.map((entity) => this.toDomain(entity));
    }

    async findAll(): Promise<FileToActionEntity[]> {
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDomain(entity));
    }

    private toDomain(entity: PostgresFileToActionEntity): FileToActionEntity {
        return new FileToActionEntity(
            entity.file_to_action_id,
            entity.file_to_action_date,
            entity.file_to_action_performed_By,
            entity.file_to_action_action
        );
    }
}
