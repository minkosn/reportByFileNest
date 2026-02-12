import { Injectable, Inject } from '@nestjs/common';
import { FileDetailRepository } from './file.detail.repository';
import { FileDetailEntity } from './file.detail.entity';
import { FILE_DETAIL_REPOSITORY } from '../../../infrastructure/database/db.tokens';
import { FileDetailTypeFields as FileDetailType } from '../file-detail-type/file.detail.type.enum';
import { IFileDetailType } from '../file.interfaces';

import { FileActionName } from '../file-action/file.action.enums';

import { FileDetailTypeService } from '../file-detail-type/file.detail.type.service';

/* Service add details for each action related to file*/

type UploadType = Omit<IFileDetailType, FileDetailType.BATCH_ID>;
type ImportType = Pick<IFileDetailType, FileDetailType.BATCH_ID>;

@Injectable()
export class FileDetailService {
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
        //const detailTypeId = await this.fileDetailRepository.getDetailTypeId(Object.keys(detail)[0]);
        const detailType = await this.fileDetailTypeService.getFileDetailTypes(
            Object.keys(detail)[0] as unknown as IFileDetailType,
        );
        if (!detailType?.file_detail_type_id) {
            throw new Error(`Detail type not found: ${Object.keys(detail)[0]}`);
        }
        const fileDetailEntity: FileDetailEntity = {
            file_detail_file_to_action: fileToActionId,
            file_detail_value: Object.values(detail)[0],
            file_detail_type: detailType.file_detail_type_id, //Object.keys(detail)[0] as FileDetailType,
        };
        await this.addFileDetail(fileDetailEntity);

        return true;
    }

    private async addFileDetailsOnImport(
        fileToActionId: number,
        fileDetails: Record<string, string>,
    ): Promise<boolean> {
        const result = await Promise.resolve([fileToActionId, fileDetails]);
        throw new Error(`Not implemented yet: ${JSON.stringify(result)}`);
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
                throw new Error(`Unknown category detail: ${action}`);
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
                throw new Error(`Unknown category detail: ${action}`);
        }
    }

    //general method to add details based on action
    async add(action: FileActionName, actionId: number, Details: IFileDetailType[]): Promise<boolean> {
        //get method to add details
        const method = this.getDetailActionMethod(action);
        //get required params for action
        const paramNames = this.getDetailActionParams(action);

        //process each detail
        for (const detail of Details) {
            //get passed params
            const paramsByAction = Object.keys(detail).filter((key) => paramNames.includes(key));

            //get params and call method to store details
            for (const param of paramsByAction) {
                const detailValue = detail[param as keyof IFileDetailType];
                if (detailValue === undefined) {
                    throw new Error(`Missing parameter: ${param}`);
                }
                //store details
                const value = detailValue instanceof Date ? detailValue.toISOString() : String(detailValue);
                await method.call(this, actionId, { [param]: value });
            }
        }

        return true;
    }
}
