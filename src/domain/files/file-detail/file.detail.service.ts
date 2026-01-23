import { Injectable, Inject } from '@nestjs/common';
import { FileDetailRepository } from './file.detail.repository';
import { FileDetailEntity } from './file.detail.entity';
import { FILE_DETAIL_REPOSITORY } from '../../../infrastructure/database/db.tokens' 
import { FileDetailType } from '../file-detail-type/file.detail.type.enum';
import { IFileDetailType } from '../file.interfaces'

/* Service add details for each action related to file*/

@Injectable()
export class FileDetailService {
    constructor(
        @Inject(FILE_DETAIL_REPOSITORY)
        private readonly fileDetailRepository: FileDetailRepository
    ){};

    private async addFileDetail(fileDetail: FileDetailEntity): Promise<FileDetailEntity> {
        return this.fileDetailRepository.create(fileDetail);
    }

    async addFileDetailsOnUpload(fileToActionId: number, fileDetails: Omit<IFileDetailType, FileDetailType.BATCH_ID>): Promise<boolean> {
        
        for (const detailType in fileDetails) {
            const fileDetailEntity: FileDetailEntity = {
                file_detail_value: fileDetails[detailType],
                file_detail_type: detailType as FileDetailType,
                file_detail_file_to_action: fileToActionId
            };
            await this.addFileDetail(fileDetailEntity);
        }

        return true;
    }

    async addFileDetailsOnImport(): Promise<boolean> {
        return true;
    }
}