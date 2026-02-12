import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { DatabaseTypeEnum } from '../shared.enum';
import { 
    DB_HOST_KEY_NAME,
    DB_PORT_KEY_NAME,
    DB_USER_KEY_NAME, 
    DB_PASSWORD_KEY_NAME,
    DB_NAME_KEY_NAME,
    MONGO_URI_KEY_NAME,
    MSSQL_URI_KEY_NAME
} from '../constants'

interface MongoConfig {
    uri: string;
}

interface MssqlConfig {
    uri: string;
}

interface PostgresConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

type Configs = PostgresConfig | MongoConfig | MssqlConfig;

type DatabaseType =
    | DatabaseTypeEnum.POSTGRES_DB_TYPE
    | DatabaseTypeEnum.MONGO_DB_TYPE
    | DatabaseTypeEnum.MSSQL_DB_TYPE;

@Injectable()
export class ConfigService {
    constructor(private nestConfigService: NestConfigService) {}

    get(key: string): string {
        const value = this.nestConfigService.get<string>(key);
        return value ?? '';
    }

    getDbType(): DatabaseType {
        return (process.env.DB_TYPE ?? DatabaseTypeEnum.POSTGRES_DB_TYPE) as DatabaseType;
    }

    getConfig(): Configs {
        switch (this.getDbType()) {
            case DatabaseTypeEnum.MONGO_DB_TYPE:
                return this.getConfigMongo();
            case DatabaseTypeEnum.MSSQL_DB_TYPE:
                return this.getConfigMssql();
            default:
                return this.getConfigPostgres();
        }
    }

    getConfigPostgres(): PostgresConfig {
        return {
            host: this.get(DB_HOST_KEY_NAME),
            port: parseInt(this.get(DB_PORT_KEY_NAME), 10),
            user: this.get(DB_USER_KEY_NAME),
            password: this.get(DB_PASSWORD_KEY_NAME),
            database: this.get(DB_NAME_KEY_NAME),
        };
    }

    getConfigMongo(): MongoConfig {
        return {
            uri: this.get(MONGO_URI_KEY_NAME),
        };
    }

    getConfigMssql(): MssqlConfig {
        return {
            uri: this.get(MSSQL_URI_KEY_NAME),
        };
    }
}
