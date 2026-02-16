import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { DatabaseTypeEnum } from '../shared.enum';
import { 
    DB_HOST_KEY_NAME,
    DB_PORT_KEY_NAME,
    DB_USER_KEY_NAME, 
    DB_PASSWORD_KEY_NAME,
    DB_NAME_KEY_NAME,
    DB_TYPE_KEY_NAME,
    MONGO_URI_KEY_NAME,
    MSSQL_URI_KEY_NAME,
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
    constructor(private readonly nestConfigService: NestConfigService) {}

    /**
     * Retrieves a configuration value. Throws an error if the key is not found.
     * @param key The configuration key.
     */
    get<T>(key: string): T {
        const value = this.nestConfigService.get<T>(key);
        if (value === undefined) {
            // This will typically be caught by NestConfigService itself, but this provides an explicit safeguard.
            throw new InternalServerErrorException(`Configuration key "${key}" is not set.`);
        }
        return value;
    }

    getDbType(): DatabaseType {
        const dbType = this.nestConfigService.get<string>(DB_TYPE_KEY_NAME) ?? DatabaseTypeEnum.POSTGRES_DB_TYPE;
        if (!Object.values(DatabaseTypeEnum).includes(dbType as DatabaseTypeEnum)) {
            throw new InternalServerErrorException(`Invalid DB_TYPE specified in environment variables: ${dbType}`);
        }
        return dbType as DatabaseType;
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
        const port = parseInt(this.get<string>(DB_PORT_KEY_NAME), 10);
        if (isNaN(port)) {
            throw new InternalServerErrorException(`Invalid port number specified for DB_PORT.`);
        }

        return {
            host: this.get<string>(DB_HOST_KEY_NAME),
            port,
            user: this.get<string>(DB_USER_KEY_NAME),
            password: this.get<string>(DB_PASSWORD_KEY_NAME),
            database: this.get<string>(DB_NAME_KEY_NAME),
        };
    }

    getConfigMongo(): MongoConfig {
        return {
            uri: this.get<string>(MONGO_URI_KEY_NAME),
        };
    }

    getConfigMssql(): MssqlConfig {
        return {
            uri: this.get<string>(MSSQL_URI_KEY_NAME),
        };
    }

    getJwtConfig() {
        return {
            secret: this.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: this.get<string>('JWT_EXPIRES_IN'),
            },
        };
    }
}
