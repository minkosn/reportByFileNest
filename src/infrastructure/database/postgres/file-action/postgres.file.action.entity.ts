import { FileActionName, FileActionStatus } from '../../../../domain/files/file-action/file.action.entity';
import { Entity, Column } from 'typeorm';

@Entity('fileAction', { schema: 'file' })
export class PostgresFileActionEntity {
    @Column({
        type: 'string',
        name: 'file_action_name',
        enum: FileActionName 
    })
    file_action_name: FileActionName; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS
    
    @Column({
        type: 'string',
        name: 'file_action_status',
        enum: FileActionStatus,
        default: FileActionStatus.ACTIVE 
    })
    file_action_status: FileActionStatus; //Enum of status: ACTIVE, INACTIVE
    
    @Column()
    file_action_updated_on?: Date; //triggered on action
    
    @Column()
    file_action_updated_by: number;
};