import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
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
}