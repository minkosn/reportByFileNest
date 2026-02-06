import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { DatabaseTypeEnum } from '../shared.enum';

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

export type DatabaseType =
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
        //return (process.env.DB_TYPE as DatabaseType) || DatabaseTypeEnum.POSTGRES_DB_TYPE;
        return (process.env.DB_TYPE ?? DatabaseTypeEnum.POSTGRES_DB_TYPE) as DatabaseType;
    }

    getConfig(): Configs {
        switch (this.getDbType()) {
            case DatabaseTypeEnum.MONGO_DB_TYPE:
                return this.getConfigMongo();
            case DatabaseTypeEnum.MSSQL_DB_TYPE:
                return this.getConfigMssql();
            default: //DatabaseTypeEnum.POSTGRES_DB_TYPE
                return this.getConfigPostgres();
        }
    }

    getConfigPostgres(): PostgresConfig {
        return {
            host: this.get('DB_HOST'),
            port: parseInt(this.get('DB_PORT'), 10),
            user: this.get('DB_USER'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
        };
    }

    getConfigMongo(): MongoConfig {
        return {
            uri: this.get('MONGO_URI'),
        };
    }

    getConfigMssql(): MssqlConfig {
        return {
            uri: this.get('MSSQL_URI'),
        };
    }
}
