export class FileDetailTypeEntity {
    id: number;
    data: string;
    performedBy: number; //FK user id
    updatedOn: Date; //triggered on action

    constructor(id: number, data: string, performedBy: number, updatedOn: Date) {
        this.id = id;
        this.performedBy = performedBy;
        this.updatedOn = updatedOn;
        this.data = data;
    }
}
