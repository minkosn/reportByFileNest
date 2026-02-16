import { FileDetailTypeEntity } from './file.detail.type.entity';
import { FileRepository, FileDetailType } from '../file.interfaces';

export interface FileDetailTypeRepository extends FileRepository<FileDetailTypeEntity> {
    findByType(type: FileDetailType): Promise<FileDetailTypeEntity | null>;
    findAll(): Promise<FileDetailTypeEntity[]>;
    create(entity: FileDetailTypeEntity): Promise<FileDetailTypeEntity>;
}
