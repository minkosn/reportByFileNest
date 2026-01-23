// relation file 1:m file details
import { FileDetailType } from "../file-detail-type/file.detail.type.enum";
export class FileDetailEntity {
    file_detail_type: FileDetailType; //Enum ?  'DISTRIBUTOR' | 'YEAR' | 'MONTH' | 'BATCH_ID'
    file_detail_value: string; //distributor when is import action , year: string; month: string, batchId
    file_detail_file_to_action: number; //FK file-to-action 
}