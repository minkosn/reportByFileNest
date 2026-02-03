import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileToAction', { schema: 'file' })
export class PostgresFileToActionEntity {
    @PrimaryGeneratedColumn()
    file_to_action_id: number;
    
    @Column({
        type: 'bigint',
        name: 'file_to_action_action'
    })
    file_to_action_action: number; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS
        
    @Column()
    file_to_action_date: Date;
    
    @Column()
    file_to_action_performed_By: number;

    constructor() {
        this.file_to_action_id = 0;
        this.file_to_action_action = 0;
        this.file_to_action_date = new Date();
        this.file_to_action_performed_By = 0;
    }
};