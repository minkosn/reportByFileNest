import { PostgresFileDetailEntity } from './postgres.file.detail.entity';
import { Repository } from 'typeorm';
import { FileDetailRepository } from '../../../../domain/files/file-detail/file.detail.repository';
import { FileDetailEntity } from '../../../../domain/files/file-detail/file.detail.entity';
import { FileDetailType } from '../../../../domain/files/file.interfaces';

export class PostgresFileDetailRepository implements FileDetailRepository {
    constructor(private readonly repo: Repository<PostgresFileDetailEntity>) {}

    async create(fileDetailEntityDomain: FileDetailEntity): Promise<FileDetailEntity> {
        const entity = this.repo.create({
            file_detail_type: fileDetailEntityDomain.typeId,
            file_detail_value: fileDetailEntityDomain.value,
            file_detail_file_to_action: fileDetailEntityDomain.fileToActionId,
        });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }

    async getByField(fieldName: string, value: FileDetailType): Promise<FileDetailEntity[]> {
        const entities = await this.repo.findBy({ [fieldName]: value } as any);
        return entities.map((entity) => this.toDomain(entity));
    }

    async findAll(): Promise<FileDetailEntity[]> {
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDomain(entity));
    }

    private toDomain(entity: PostgresFileDetailEntity): FileDetailEntity {
        return new FileDetailEntity(
            entity.file_detail_id,
            entity.file_detail_type,
            entity.file_detail_value,
            entity.file_detail_file_to_action,
        );
    }
}
