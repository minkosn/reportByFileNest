
//relation file m:1 Action
export class FileToActionEntity {
    file_to_action_id?: number;
    file_to_action_date: Date; //import date, update data, clear date
    file_to_action_performed_By: number;//FK user id     
    file_to_action_action: number; // FK action id
}