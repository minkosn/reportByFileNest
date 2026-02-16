import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileDetail', { schema: 'file' })
export class PostgresFileDetailEntity {
    @PrimaryGeneratedColumn()
    file_detail_id!: number;

    @Column()
    file_detail_type!: number; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS

    @Column()
    file_detail_value!: string;

    @Column()
    file_detail_file_to_action!: number;
}
