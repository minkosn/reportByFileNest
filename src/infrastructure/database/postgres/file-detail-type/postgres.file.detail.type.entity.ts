import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('fileDetailType', { schema: 'file' })
export class PostgresFileDetailTypeEntity {
    @PrimaryGeneratedColumn()
    file_detail_type_id!: number;

    @Column()
    file_detail_type_data!: string;

    @Column()
    file_detail_type_performed_by!: number;

    @UpdateDateColumn()
    file_detail_type_updated_on!: Date;
}
