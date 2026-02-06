import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileDetailType', { schema: 'file' })
export class PostgresFileDetailTypeEntity {
    @PrimaryGeneratedColumn()
    file_detail_type_id: number;

    @Column()
    file_detail_type_data: string;

    @Column()
    file_detail_type_performed_by: number;

    @Column()
    file_detail_type_updated_on: Date;
    constructor() {
        this.file_detail_type_updated_on = new Date();
        this.file_detail_type_performed_by = 0;
        this.file_detail_type_data = '';
        this.file_detail_type_id = 0;
    }
}
