import { UserRepository } from '../../../../domain/user/user.repository';
import { User } from '../../../../domain/user/user.entity';
import { Repository } from 'typeorm';
import { PostgresUserEntity } from './postgres.user.entity';

export class PostgresUserRepository implements UserRepository {
    constructor(private readonly repo: Repository<PostgresUserEntity>) {}

    async findByName(userName: string): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { user_name: userName } });
        return entity
            ? new User(
                  entity.id,
                  entity.user_name,
                  entity.user_password,
                  entity.user_inserted_on,
                  entity.userupdated_on,
                  entity.status,
              )
            : null;
    }
    async findById(userId: number): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { id: userId } });
        return entity
            ? new User(
                  entity.id,
                  entity.user_name,
                  entity.user_password,
                  entity.user_inserted_on,
                  entity.userupdated_on,
                  entity.status,
              )
            : null;
    }
    async findAll(): Promise<User[] | null> {
        const entities = await this.repo.find();
        return entities.map(
            (entity) =>
                new User(
                    entity.id,
                    entity.user_name,
                    entity.user_password,
                    entity.user_inserted_on,
                    entity.userupdated_on,
                    entity.status,
                ),
        );
    }
    async save(user: User): Promise<User> {
        const createdUser = this.repo.create({ ...(user as object) });
        const savedUser = await this.repo.save(createdUser);
        return new User(
            savedUser.id,
            savedUser.user_name,
            savedUser.user_password,
            savedUser.user_inserted_on,
            savedUser.userupdated_on,
            savedUser.status,
        );
    }
}
