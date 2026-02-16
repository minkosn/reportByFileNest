import { Repository } from 'typeorm';
import { PostgresFileDetailTypeEntity } from './postgres.file.detail.type.entity';
import { FileDetailTypeEntity } from '../../../../domain/files/file-detail-type/file.detail.type.entity';
import { FileDetailTypeRepository } from '../../../../domain/files/file-detail-type/file.detail.type.repository';
import { FileDetailTypeType, FileDetailType } from 'src/domain/files/file.interfaces';

export class PostgresFileDetailTypeRepository implements FileDetailTypeRepository {
    constructor(private readonly repo: Repository<PostgresFileDetailTypeEntity>) {}

    async create(domainEntity: FileDetailTypeEntity): Promise<FileDetailTypeEntity> {
        // Explicitly map from the domain entity to the persistence entity
        const persistenceEntity = this.repo.create({
            file_detail_type_data: domainEntity.data,
            file_detail_type_performed_by: domainEntity.performedBy,
        });
        const saved = await this.repo.save(persistenceEntity);
        return this.toDomain(saved);
    }

    async findByType(type: FileDetailType): Promise<FileDetailTypeEntity | null> {
        const entity = await this.repo.findOneBy({ file_detail_type_data: type as unknown as string });
        return entity ? this.toDomain(entity) : null;
    }

    async findAll(): Promise<FileDetailTypeEntity[]> {
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDomain(entity));
    }

    async getByField(fieldName: string, value: FileDetailTypeType): Promise<FileDetailTypeEntity[]> {
        const entities = await this.repo.findBy({ [fieldName]: value });
        return entities.map((entity) => this.toDomain(entity));
    }

    private toDomain(entity: PostgresFileDetailTypeEntity): FileDetailTypeEntity {
        return new FileDetailTypeEntity(
            entity.file_detail_type_id,
            entity.file_detail_type_data,
            entity.file_detail_type_performed_by,
            entity.file_detail_type_updated_on,
        );
    }
}
