// relation file 1:m file details
export class FileDetailEntity {
    file_detail_id?: number;
    file_detail_type: number; //FileDetailType; //Enum ?  'DISTRIBUTOR' | 'YEAR' | 'MONTH' | 'BATCH_ID'
    file_detail_value: string; //distributor when is import action , year: string; month: string, batchId
    file_detail_file_to_action: number; //FK file-to-action 

    constructor() {
        this.file_detail_type = 0; //default type
        this.file_detail_value = ''; //default empty
        this.file_detail_file_to_action = 0; //default FK
    }
}