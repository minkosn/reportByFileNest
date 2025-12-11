"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.PG_CONNECTION = void 0;
const pg_1 = require("pg");
const config_service_1 = require("../config/config.service");
exports.PG_CONNECTION = 'PG_CONNECTION';
exports.databaseProviders = [
    {
        provide: exports.PG_CONNECTION,
        useFactory: (configService) => {
            return new pg_1.Pool({
                host: configService.get('DB_HOST'),
                port: parseInt(configService.get('DB_PORT'), 10),
                user: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
            });
        },
        inject: [config_service_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map