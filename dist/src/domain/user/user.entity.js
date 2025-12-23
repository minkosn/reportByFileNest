"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, user_name, user_password, user_inserted_on, userupdated_on, status) {
        this.id = id;
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_inserted_on = user_inserted_on;
        this.userupdated_on = userupdated_on;
        this.status = status;
    }
    getId() {
        return this.id;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map