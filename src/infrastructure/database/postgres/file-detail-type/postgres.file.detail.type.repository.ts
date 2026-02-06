import { Repository } from 'typeorm';
import { PostgresFileDetailTypeEntity } from './postgres.file.detail.type.entity';
import { FileDetailTypeRepository } from 'src/domain/files/file-detail-type/file.detail.type.repository';
import { FileDetailTypeType, IFileDetailType } from 'src/domain/files/file.interfaces';

export class PostgresFileDetailTypeRepository implements FileDetailTypeRepository {
    constructor(private readonly repo: Repository<PostgresFileDetailTypeEntity>) {}
    async create(entity: PostgresFileDetailTypeEntity) {
        return this.repo.save(entity);
    }

    async findByType(type: IFileDetailType): Promise<PostgresFileDetailTypeEntity | null> {
        return this.repo.findOneBy({ file_detail_type_data: type as unknown as string });
    }

    async findAll(): Promise<PostgresFileDetailTypeEntity[]> {
        return this.repo.find();
    }

    async getByField(fieldName: string, value: FileDetailTypeType): Promise<PostgresFileDetailTypeEntity[]> {
        return this.repo.findBy({ [fieldName]: value });
    }
}
