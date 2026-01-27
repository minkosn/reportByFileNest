import { PostgresFileDetailEntity } from './postgres.file.detail.entity';
import { Repository } from 'typeorm'
import { FileDetailRepository } from 'src/domain/files/file-detail/file.detail.repository';

export class PostgresFileDetailRepository implements FileDetailRepository {
    constructor(private readonly repo: Repository<PostgresFileDetailEntity>){};
    create(entity: PostgresFileDetailEntity) {
        return this.repo.save(entity);
    }

    getByField(fieldName: string, value: any): Promise<PostgresFileDetailEntity[]> {
        return this.repo.findBy({ [fieldName]: value });
    }

    findAll(): Promise<PostgresFileDetailEntity[]> {
        return this.repo.find();
    }
};