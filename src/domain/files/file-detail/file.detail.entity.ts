// relation file 1:m file details
export class FileDetailEntity {
    id?: number;
    typeId: number; // 'DISTRIBUTOR' | 'YEAR' | 'MONTH' | 'BATCH_ID'
    value: string; //distributor when is import action , year: string; month: string, batchId
    fileToActionId: number; //FK file-to-action

    constructor(id: number | undefined, typeId: number, value: string, fileToActionId: number) {
        this.id = id;
        this.typeId = typeId;
        this.value = value;
        this.fileToActionId = fileToActionId;
    }
}
