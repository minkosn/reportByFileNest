/*export enum FileDetailType {
    //On upload
    FILE_NAME = 'file_name',
    FILE_NAME_ORIGIN = 'file_name_origin',
    FILE_PATH = 'file_path',
    
    //On import
    DISTRIBUTOR = 'distributor',
    YEAR = 'year',
    MONTH = 'month',
    BATCH_ID = 'batch_id'
};*/ 

import { FileDetailType } from "./file.detail.type.enum";

export class FileDetailTypeEntity {
    file_detail_type_data: FileDetailType;
    file_detail_type_performed_by: number;//FK user id
    file_detail_type_updated_on: Date; //triggered on action
}