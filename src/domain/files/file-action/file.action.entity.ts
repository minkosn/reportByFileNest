
export enum FileActionName {
    UPLOAD = 'UPLOAD',
    IMPORT = 'IMPORT',
    CLEAR_UPLOADS = 'CLEAR_UPLOADS'
}

export enum FileActionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

//relation file 1:m FileActions
export class FileActionEntity {
    file_action_name: FileActionName; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS
    file_action_status: FileActionStatus; //Enum of status: ACTIVE, INACTIVE
    file_action_updated_on: Date; //triggered on action
    file_action_updated_by: number; //FK user id
}