import { FileToActionRepository } from '../../../../domain/files/file-to-action/file.to.action.repository';
import { PostgresFileToActionEntity } from './postgres.file.to.action.entity';
import { Repository } from 'typeorm';
import { FileToActionDataType } from '../../../../domain/files/file.interfaces';

export class PostgresFileToActionRepository implements FileToActionRepository {
    constructor(private readonly repo: Repository<PostgresFileToActionEntity>) {}

    create(entity: PostgresFileToActionEntity) {
        return this.repo.save(entity);
    }

    getByField(fieldName: string, value: FileToActionDataType): Promise<PostgresFileToActionEntity[]> {
        return this.repo.findBy({ [fieldName]: value });
    }

    findAll(): Promise<PostgresFileToActionEntity[]> {
        return this.repo.find();
    }
}
