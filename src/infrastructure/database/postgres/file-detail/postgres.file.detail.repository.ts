import { PostgresFileDetailEntity } from './postgres.file.detail.entity';
import { Repository } from 'typeorm'
import { FileDetailRepository } from 'src/domain/files/file-detail/file.detail.repository';
import { FileDetailType } from 'src/domain/files/file.interfaces';

export class PostgresFileDetailRepository implements FileDetailRepository {
    constructor(
        private readonly repo: Repository<PostgresFileDetailEntity>,
        //private readonly dataSource: DataSource
    ){};
    async create(entity: PostgresFileDetailEntity) {
        return this.repo.save(entity);
    }

    async getByField(fieldName: string, value: FileDetailType): Promise<PostgresFileDetailEntity[]> {
        return this.repo.findBy({ [fieldName]: value });
    }

    async findAll(): Promise<PostgresFileDetailEntity[]> {
        return this.repo.find();
    }
    /*
    async getDetailTypeId(detailType: string): Promise<number> {
        const queryRunner = this.dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await queryRunner.query('SELECT file_detail_type_id FROM file."fileDetailType" WHERE file_detail_type_data = $1', [detailType]);
            await queryRunner.commitTransaction();
            return Number(result?.[0].file_detail_type_id);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw {...err, type: 'DBError'};
        } finally {     
            await queryRunner.release();
        }
    }*/
};