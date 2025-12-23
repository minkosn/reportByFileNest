"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const user_entity_1 = require("../../../domain/user/user.entity");
class PostgresUserRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async findByName(userName) {
        const entity = await this.repo.findOne({ where: { user_name: userName } });
        return entity ? new user_entity_1.User(entity.id, entity.user_name, entity.user_password, entity.user_inserted_on, entity.userupdated_on, entity.status) : null;
    }
    async findById(userId) {
        const entity = await this.repo.findOne({ where: { id: userId } });
        return entity ? new user_entity_1.User(entity.id, entity.user_name, entity.user_password, entity.user_inserted_on, entity.userupdated_on, entity.status) : null;
    }
    async findAll() {
        const entities = await this.repo.find();
        return entities.map(entity => new user_entity_1.User(entity.id, entity.user_name, entity.user_password, entity.user_inserted_on, entity.userupdated_on, entity.status));
    }
    async save(user) {
        const createdUser = this.repo.create({ ...user });
        const savedUser = await this.repo.save(createdUser);
        return new user_entity_1.User(savedUser.id, savedUser.user_name, savedUser.user_password, savedUser.user_inserted_on, savedUser.userupdated_on, savedUser.status);
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
//# sourceMappingURL=postgres.user.repository.js.map