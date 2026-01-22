import { FileDetailTypeEntity, FileDetailType } from "./file.detail.type.entity";
import { IFileRepository } from '../file.interfaces'

export interface FileDetailTypeRepository extends IFileRepository<FileDetailTypeEntity> {
    findByType(type: FileDetailType): Promise<FileDetailTypeEntity | null>;    
};