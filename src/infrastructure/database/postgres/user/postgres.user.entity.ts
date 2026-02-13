import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users', { schema: 'user' })
export class PostgresUserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_name!: string;

    @Column()
    user_password!: string;

    @CreateDateColumn()
    user_inserted_on!: Date;

    @UpdateDateColumn()
    userupdated_on!: Date;

    @Column({ default: 'active' })
    status!: string;
}
