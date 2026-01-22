export enum FileDetailType {
    FILE_NAME = 'file_name',
    DISTRIBUTOR = 'distributor',
    YEAR = 'year',
    MONTH = 'month',
    BATCH_ID = 'batch_id'
};  

export class FileDetailTypeEntity {
    file_detail_type_data: FileDetailType;
    file_detail_type_performed_by: number;//FK user id
    file_detail_type_updated_on: Date; //triggered on action
}