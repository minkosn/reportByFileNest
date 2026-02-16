import { Injectable, Inject, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FileDetailRepository } from './file.detail.repository';
import { FileDetailEntity } from './file.detail.entity';
import { FILE_DETAIL_REPOSITORY } from '../../../infrastructure/database/db.tokens';
import { FileDetailTypeFields as FileDetailType } from '../file-detail-type/file.detail.type.enum';
import { FileDetailTypeRec } from '../file.interfaces';

import { FileActionName } from '../file-action/file.action.enums';

import { FileDetailTypeService } from '../file-detail-type/file.detail.type.service';

/* Service add details for each action related to file*/

//type UploadType = Omit<FileDetailTypeEnum, FileDetailTypeEnum.BATCH_ID>;
//type ImportType = Pick<FileDetailTypeEnum, FileDetailTypeEnum.BATCH_ID>;

@Injectable()
export class FileDetailService {
    private readonly logger = new Logger(FileDetailService.name);

    constructor(
        @Inject(FILE_DETAIL_REPOSITORY)
        private readonly fileDetailRepository: FileDetailRepository,
        private readonly fileDetailTypeService: FileDetailTypeService,
    ) {}

    private async addFileDetail(fileDetail: FileDetailEntity): Promise<FileDetailEntity> {
        return this.fileDetailRepository.create(fileDetail);
    }

    //one pair of property-value at call
    private async addFileDetailsOnUpload(fileToActionId: number, detail: Record<string, string>): Promise<boolean> {
        const [key, value] = Object.entries(detail)[0];

        const detailType = await this.fileDetailTypeService.getFileDetailTypeByType(key as unknown as FileDetailType);

        if (!detailType?.id) {
            this.logger.error(`Detail type not found: ${key}`);
            throw new InternalServerErrorException(`Detail type not found: ${key}`);
        }
        const fileDetailEntity: FileDetailEntity = {
            fileToActionId,
            value,
            typeId: detailType.id,
        };
        await this.addFileDetail(fileDetailEntity);

        return true;
    }

    private async addFileDetailsOnImport(
        fileToActionId: number,
        fileDetails: Record<string, string>,
    ): Promise<boolean> {
        const result = await Promise.resolve([fileToActionId, fileDetails]);
        throw new InternalServerErrorException(`Not implemented yet: ${JSON.stringify(result)}`);
    }

    //get method to add detail based on action
    private getDetailActionMethod(
        action: FileActionName,
    ): (fileToActionId: number, fileDetails: Record<string, string>) => Promise<boolean> {
        switch (action) {
            case FileActionName.UPLOAD:
                return this.addFileDetailsOnUpload.bind(this);
            case FileActionName.IMPORT:
                return this.addFileDetailsOnImport.bind(this);
            default:
                throw new BadRequestException(`Unknown category detail: ${action}`);
        }
    }

    //get params based on action
    private getDetailActionParams(action: FileActionName): string[] {
        switch (action) {
            case FileActionName.UPLOAD:
                return Object.values(FileDetailType).filter((type) => type !== FileDetailType.BATCH_ID);
            case FileActionName.IMPORT:
                return [FileDetailType.BATCH_ID];
            default:
                throw new BadRequestException(`Unknown category detail: ${action}`);
        }
    }

    //general method to add details based on action
    async add(action: FileActionName, actionId: number, details: FileDetailTypeRec[]): Promise<boolean> {
        //get method to add details
        const method = this.getDetailActionMethod(action);
        //get required params for action
        const paramNames = this.getDetailActionParams(action);

        //process each detail
        for (const detail of details) {
            //get passed params
            const paramsByAction = Object.keys(detail).filter((key) => paramNames.includes(key));

            //get params and call method to store details
            for (const param of paramsByAction) {
                const detailValue = detail[param as keyof FileDetailTypeRec];
                if (detailValue === undefined) {
                    throw new BadRequestException(`Missing parameter: ${param}`);
                }
                //store details
                const value = detailValue instanceof Date ? detailValue.toISOString() : String(detailValue);
                await method.call(this, actionId, { [param]: value });
            }
        }

        return true;
    }
}
