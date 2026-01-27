import { FileActionEntity } from 'src/domain/files/file-action/file.action.entity';
import { FileActionName, FileActionStatus } from 'src/domain/files/file-action/file.action.enums';
import { FileToActionRepository } from '../../../../domain/files/file-to-action/file.to.action.repository';
import { PostgresFileToActionEntity } from './postgres.file.to.action.entity';
import { Repository } from 'typeorm'

export class PostgresFileToActionRepository implements FileToActionRepository {
    constructor(private readonly repo: Repository<PostgresFileToActionEntity>){};

    create(entity: PostgresFileToActionEntity) {
        return this.repo.save(entity);
    }

    getByField(fieldName: string, value: any): Promise<PostgresFileToActionEntity[]> {
        return this.repo.findBy({ [fieldName]: value });
    }

    findAll(): Promise<PostgresFileToActionEntity[]> {
        return this.repo.find();
    }
};