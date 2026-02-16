import { FileActionName, FileActionStatus } from '../../../../domain/files/file-action/file.action.enums';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('fileAction', { schema: 'file' })
export class PostgresFileActionEntity {
    @PrimaryGeneratedColumn({
        name: 'file_action_id',
    })
    id!: number;

    @Column({
        type: 'text',
        name: 'file_action_name',
        enum: FileActionName,
        default: FileActionName.UPLOAD,
    })
    name!: FileActionName; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS

    @Column({
        type: 'bigint',
        name: 'file_action_status',
    })
    status!: FileActionStatus; //Enum of status: ACTIVE, INACTIVE

    @UpdateDateColumn({
        name: 'file_action_updated_on',
    })
    updatedOn?: Date; //triggered on action

    @Column({
        name: 'file_action_updated_by',
    })
    updatedBy!: number;
}
