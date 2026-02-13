// relation file 1:m file details
export class FileDetailEntity {
    file_detail_id?: number;
    file_detail_type: number; // 'DISTRIBUTOR' | 'YEAR' | 'MONTH' | 'BATCH_ID'
    file_detail_value: string; //distributor when is import action , year: string; month: string, batchId
    file_detail_file_to_action: number; //FK file-to-action

    constructor(id: number, type: number, value: string, file_to_action: number) {
        this.file_detail_id = id; //default
        this.file_detail_type = type; //default type
        this.file_detail_value = value; //default empty
        this.file_detail_file_to_action = file_to_action; //default FK
    }
}
