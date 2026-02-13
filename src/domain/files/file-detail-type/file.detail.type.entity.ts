export class FileDetailTypeEntity {
    file_detail_type_id: number;
    file_detail_type_data: string; //FileDetailType;
    file_detail_type_performed_by: number; //FK user id
    file_detail_type_updated_on: Date; //triggered on action

    constructor(id: number, data: string, performed_by: number, updated_on: Date) {
        this.file_detail_type_id = id;
        this.file_detail_type_performed_by = performed_by; //default user
        this.file_detail_type_updated_on = updated_on; //default to now
        this.file_detail_type_data = data; //default empty
    }
}
