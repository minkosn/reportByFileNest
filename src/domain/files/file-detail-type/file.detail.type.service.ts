import { Inject, Injectable } from '@nestjs/common';
import { FileDetailTypeRepository } from './file.detail.type.repository';
import { FILE_DETAIL_TYPE_REPOSITORY } from '../../../infrastructure/database/db.tokens'
import { FileDetailTypeEntity } from './file.detail.type.entity';
import { IFileDetailType } from '../file.interfaces'


@Injectable()
export class FileDetailTypeService {
    constructor(
        @Inject(FILE_DETAIL_TYPE_REPOSITORY)
        private readonly repo: FileDetailTypeRepository 
    ) {};

    async createFileDetailType(fileDetailTypeEntity: FileDetailTypeEntity): Promise<FileDetailTypeEntity> {
        return this.repo.create(fileDetailTypeEntity);
    }

    async getFileDetailTypes(type: IFileDetailType): Promise<FileDetailTypeEntity> {
        return this.repo.findByType(type);
    }
}