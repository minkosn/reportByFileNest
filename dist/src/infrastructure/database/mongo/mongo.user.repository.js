"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const user_entity_1 = require("../../../domain/user/user.entity");
class MongoUserRepository {
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        const doc = await this.model.findById(id).exec();
        if (!doc)
            return null;
        return new user_entity_1.User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
    }
    async findByName(name) {
        const doc = await this.model.findOne({ user_name: name }).exec();
        if (!doc)
            return null;
        return new user_entity_1.User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
    }
    async findAll() {
        const docs = await this.model.find().exec();
        return docs.map((d) => new user_entity_1.User(d.id, d.user_name, d.user_password, d.user_inserted_on, d.userupdated_on, d.status));
    }
    async save(user) {
        const doc = await this.model
            .findByIdAndUpdate(user.getId(), { ...user }, { upsert: true, new: true })
            .exec();
        return new user_entity_1.User(doc.id, doc.user_name, doc.user_password, doc.user_inserted_on, doc.userupdated_on, doc.status);
    }
}
exports.MongoUserRepository = MongoUserRepository;
//# sourceMappingURL=mongo.user.repository.js.map