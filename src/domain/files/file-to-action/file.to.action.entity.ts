//relation file m:1 Action
export class FileToActionEntity {
    id?: number;
    date: Date; //import date, update data, clear date
    performedBy: number; //FK user id
    actionId: number; // FK action id

    constructor(id: number | undefined, date: Date, performedBy: number, actionId: number) {
        this.id = id;
        this.date = date;
        this.performedBy = performedBy;
        this.actionId = actionId;
    }
}
