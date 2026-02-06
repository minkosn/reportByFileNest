export class FileDetailTypeEntity {
    file_detail_type_id?: number;
    file_detail_type_data: string; //FileDetailType;
    file_detail_type_performed_by: number; //FK user id
    file_detail_type_updated_on: Date; //triggered on action

    constructor() {
        this.file_detail_type_performed_by = 1; //default user
        this.file_detail_type_updated_on = new Date(); //default to now
        this.file_detail_type_data = ''; //default empty
    }
}
