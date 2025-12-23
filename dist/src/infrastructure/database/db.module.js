"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../../config/config.module");
const config_service_1 = require("../../config/config.service");
const db_tokens_1 = require("./db.tokens");
const postgres_module_1 = require("./postgres/postgres.module");
const postgres_strategy_1 = require("./postgres/postgres.strategy");
const postgres_factory_1 = require("./postgres/postgres.factory");
const mongo_module_1 = require("./mongo/mongo.module");
const mongo_strategy_1 = require("./mongo/mongo.strategy");
const mongo_factory_1 = require("./mongo/mongo.factory");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static forRoot() {
        return {
            module: DatabaseModule_1,
            imports: [config_module_1.ConfigModule, postgres_module_1.PostgresModule, mongo_module_1.MongoModule],
            providers: [
                {
                    provide: db_tokens_1.DB_STRATEGY,
                    useFactory: (config) => {
                        switch (config.getDbType()) {
                            case 'postgres': return new postgres_strategy_1.PostgresStrategy();
                            case 'mongo': return new mongo_strategy_1.MongoStrategy();
                            case 'mssql':
                            default: throw new Error('MSSQL not yet implemented');
                        }
                    },
                    inject: [config_service_1.ConfigService]
                },
                {
                    provide: db_tokens_1.DB_FACTORY,
                    useFactory: (config, postgresFactory, mongoFactory) => {
                        switch (config.getDbType()) {
                            case 'postgres': return postgresFactory;
                            case 'mongo': return mongoFactory;
                            case 'mssql':
                            default: throw new Error('MSSQL not yet implemented');
                        }
                    },
                    inject: [config_service_1.ConfigService, postgres_factory_1.PostgresFactory, mongo_factory_1.MongoFactory]
                },
                {
                    provide: db_tokens_1.USER_REPOSITORY,
                    useFactory: (factory) => factory.createUserRepository(),
                    inject: [db_tokens_1.DB_FACTORY]
                },
            ],
            exports: [db_tokens_1.USER_REPOSITORY]
        };
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);
//# sourceMappingURL=db.module.js.map