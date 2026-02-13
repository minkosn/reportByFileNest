//relation file m:1 Action
export class FileToActionEntity {
    file_to_action_id?: number;
    file_to_action_date: Date; //import date, update data, clear date
    file_to_action_performed_By: number; //FK user id
    file_to_action_action: number; // FK action id
    
    constructor(action_id: number, action_date: Date, performed_By: number, action_action: number) {
        this.file_to_action_id = action_id;
        this.file_to_action_date = action_date;
        this.file_to_action_performed_By = performed_By;
        this.file_to_action_action = action_action;
    }
}
