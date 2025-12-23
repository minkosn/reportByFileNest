"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../../../config/config.module");
const config_service_1 = require("../../../config/config.service");
const postgres_user_entity_1 = require("./postgres.user.entity");
const postgres_factory_1 = require("./postgres.factory");
let PostgresModule = class PostgresModule {
};
exports.PostgresModule = PostgresModule;
exports.PostgresModule = PostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: parseInt(configService.get('DB_PORT')),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [postgres_user_entity_1.PostgresUserEntity],
                    synchronize: true,
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([postgres_user_entity_1.PostgresUserEntity])
        ],
        providers: [
            postgres_factory_1.PostgresFactory
        ],
        exports: [
            postgres_factory_1.PostgresFactory
        ]
    })
], PostgresModule);
//# sourceMappingURL=postgres.module.js.map