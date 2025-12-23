"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
var DatabaseTypeEnum;
(function (DatabaseTypeEnum) {
    DatabaseTypeEnum["POSTGRES_DB_TYPE"] = "postgres";
    DatabaseTypeEnum["MONGO_DB_TYPE"] = "mongo";
    DatabaseTypeEnum["MSSQL_DB_TYPE"] = "mssql";
})(DatabaseTypeEnum || (DatabaseTypeEnum = {}));
;
let ConfigService = class ConfigService {
    constructor(nestConfigService) {
        this.nestConfigService = nestConfigService;
    }
    get(key) {
        return this.nestConfigService.get(key);
    }
    getDbType() {
        return process.env.DB_TYPE || DatabaseTypeEnum.POSTGRES_DB_TYPE;
    }
    getConfig() {
        switch (this.getDbType()) {
            case DatabaseTypeEnum.MONGO_DB_TYPE:
                return this.getConfigMongo();
            case DatabaseTypeEnum.MSSQL_DB_TYPE:
                return this.getConfigMssql();
            default:
                return this.getConfigPostgres();
        }
    }
    getConfigPostgres() {
        return {
            host: this.get('DB_HOST'),
            port: parseInt(this.get('DB_PORT'), 10),
            user: this.get('DB_USER'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
        };
    }
    getConfigMongo() {
        return {
            uri: this.get('MONGO_URI')
        };
    }
    getConfigMssql() {
        return {
            uri: this.get('MSSQL_URI')
        };
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigService);
//# sourceMappingURL=config.service.js.map