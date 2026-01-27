import { FileDetailType } from 'src/domain/files/file-detail-type/file.detail.type.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileDetail', { schema: 'file' })
export class PostgresFileDetailEntity {
    @PrimaryGeneratedColumn()
    file_detail_id: number;
    
    @Column({ 
        type: 'bigint', 
        name: 'file_detail_type',
        enum: FileDetailType
    })
    file_detail_type: FileDetailType; //Enum of actions: UPLOAD, IMPORT, CLEAR-UPLOADS
        
    @Column()
    file_detail_value: string;
    
    @Column()
    file_detail_file_to_action: number;
};