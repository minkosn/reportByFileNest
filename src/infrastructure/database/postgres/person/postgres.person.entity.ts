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

    constructor() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.birth_date = new Date();
    
    }
}