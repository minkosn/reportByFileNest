import { ConfigService as NestConfigService } from '@nestjs/config';
type MongoConfig = {
    uri: string;
};
type MssqlConfig = {
    uri: string;
};
type PostgresConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
};
type Configs = PostgresConfig | MongoConfig | MssqlConfig;
declare enum DatabaseTypeEnum {
    POSTGRES_DB_TYPE = "postgres",
    MONGO_DB_TYPE = "mongo",
    MSSQL_DB_TYPE = "mssql"
}
export type DatabaseType = DatabaseTypeEnum.POSTGRES_DB_TYPE | DatabaseTypeEnum.MONGO_DB_TYPE | DatabaseTypeEnum.MSSQL_DB_TYPE;
export declare class ConfigService {
    private nestConfigService;
    constructor(nestConfigService: NestConfigService);
    get(key: string): string;
    getDbType(): DatabaseType;
    getConfig(): Configs;
    getConfigPostgres(): PostgresConfig;
    getConfigMongo(): MongoConfig;
    getConfigMssql(): MssqlConfig;
}
export {};
