import { FileActionName, FileActionStatus } from '../../../../domain/files/file-action/file.action.enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileAction', { schema: 'file' })
export class PostgresFileActionEntity {
    @PrimaryGeneratedColumn()
    file_action_id: number;
    
    @Column({
        type: 'text',
        name: 'file_action_name',
        enum: FileActionName 
    })
    file_action_name: FileActionName; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS
    
    @Column({
        type: 'bigint',
        name: 'file_action_status',
    })
    file_action_status: FileActionStatus; //Enum of status: ACTIVE, INACTIVE
    
    @Column()
    file_action_updated_on?: Date; //triggered on action
    
    @Column()
    file_action_updated_by: number;

    constructor() {
        this.file_action_id = 0;
        this.file_action_name = FileActionName.UPLOAD;
        this.file_action_status = FileActionStatus.INACTIVE;
        this.file_action_updated_on = new Date();
        this.file_action_updated_by = 0;
    }
};