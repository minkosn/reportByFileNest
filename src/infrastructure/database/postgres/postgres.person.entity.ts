import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person', { schema: 'user' })
export class PostgresPersonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()   
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    birth_date: Date;
}