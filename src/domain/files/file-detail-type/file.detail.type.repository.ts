import { FileDetailTypeEntity,  } from "./file.detail.type.entity";
import { IFileRepository, IFileDetailType } from '../file.interfaces'

export interface FileDetailTypeRepository extends IFileRepository<FileDetailTypeEntity> {
    findByType(type: IFileDetailType): Promise<FileDetailTypeEntity | null>;
    findAll(): Promise<FileDetailTypeEntity[]>; 
    create(entity: FileDetailTypeEntity): Promise<FileDetailTypeEntity>;   
};