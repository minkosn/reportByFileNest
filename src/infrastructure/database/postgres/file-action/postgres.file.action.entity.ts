import { FileActionName, FileActionStatus } from '../../../../domain/files/file-action/file.action.enums';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('fileAction', { schema: 'file' })
export class PostgresFileActionEntity {
    @PrimaryGeneratedColumn()
    file_action_id!: number;

    @Column({
        type: 'text',
        name: 'file_action_name',
        enum: FileActionName,
        default: FileActionName.UPLOAD
    })
    file_action_name!: FileActionName; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS

    @Column({
        type: 'bigint',
        name: 'file_action_status',
    })
    file_action_status!: FileActionStatus; //Enum of status: ACTIVE, INACTIVE

    @UpdateDateColumn()
    file_action_updated_on?: Date; //triggered on action

    @Column()
    file_action_updated_by!: number;
   
}
