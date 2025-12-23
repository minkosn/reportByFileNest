"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("../../../config/config.module");
const config_service_1 = require("../../../config/config.service");
const mongo_user_schema_1 = require("./mongo.user.schema");
const mongo_factory_1 = require("./mongo.factory");
let MongoModule = class MongoModule {
};
exports.MongoModule = MongoModule;
exports.MongoModule = MongoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('uri'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: mongo_user_schema_1.MongoUser.name, schema: mongo_user_schema_1.MongoUserSchema },
            ]),
        ],
        providers: [mongo_factory_1.MongoFactory],
        exports: [mongo_factory_1.MongoFactory],
    })
], MongoModule);
//# sourceMappingURL=mongo.module.js.map