import { FileDetailType } from "./file.detail.type.enum";
export class FileDetailTypeEntity {
    file_detail_type_id?: number;
    file_detail_type_data: string;//FileDetailType;
    file_detail_type_performed_by: number;//FK user id
    file_detail_type_updated_on: Date; //triggered on action
}