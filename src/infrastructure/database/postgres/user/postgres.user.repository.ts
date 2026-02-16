import { UserRepository } from '../../../../domain/user/user.repository';
import { User } from '../../../../domain/user/user.entity';
import { Repository } from 'typeorm';
import { PostgresUserEntity } from './postgres.user.entity';

export class PostgresUserRepository implements UserRepository {
    constructor(private readonly repo: Repository<PostgresUserEntity>) {}

    async findByName(userName: string): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { user_name: userName } });
        return entity ? this.toDomain(entity) : null;
    }
    async findById(userId: number): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { id: userId } });
        return entity ? this.toDomain(entity) : null;
    }
    async findAll(): Promise<User[]> {
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDomain(entity));
    }
    async save(user: User): Promise<User> {
        const createdUser = this.repo.create({ ...(user as object) });
        const savedUser = await this.repo.save(createdUser);
        return this.toDomain(savedUser);
    }

    private toDomain(entity: PostgresUserEntity): User {
        return new User(
            entity.id,
            entity.user_name,
            entity.user_password,
            entity.user_inserted_on,
            entity.userupdated_on,
            entity.status,
        );
    }
}
