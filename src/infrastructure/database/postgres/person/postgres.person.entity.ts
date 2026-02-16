import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('person', { schema: 'user' })
export class PostgresPersonEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    first_name!: string;
    @Column()
    last_name!: string;
    @CreateDateColumn()
    birth_date!: Date;
}
