import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'user' })
export class PostgresUserEntity {   
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_name: string;
    @Column()
    user_password: string;
    @Column()
    user_inserted_on: Date;
    @Column()
    userupdated_on: Date;
    @Column()
    status: string;      
    constructor() {
        this.user_inserted_on = new Date();
        this.userupdated_on = new Date();
        this.status = 'active';
        this.user_name = '';
        this.user_password = '';
        this.id = 0;    
    }  
}