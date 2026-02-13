import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'user' })
export class PostgresAuthEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_name' })
    username!: string;

    @Column({ name: 'user_password' })
    hashedPassword!: string;
}
