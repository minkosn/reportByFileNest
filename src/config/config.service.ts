import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

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

enum DatabaseTypeEnum {
    POSTGRES_DB_TYPE = 'postgres',
    MONGO_DB_TYPE = 'mongo',
    MSSQL_DB_TYPE = 'mssql'
};   
export type DatabaseType = DatabaseTypeEnum.POSTGRES_DB_TYPE 
    | DatabaseTypeEnum.MONGO_DB_TYPE 
    | DatabaseTypeEnum.MSSQL_DB_TYPE;

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get(key: string): string {
    return this.nestConfigService.get<string>(key) ?? '';
  }

  getDbType(): DatabaseType {
    return (process.env.DB_TYPE as DatabaseType) || DatabaseTypeEnum.POSTGRES_DB_TYPE;
  }

  getConfig(): Configs {
    switch(this.getDbType() ) {
        case DatabaseTypeEnum.MONGO_DB_TYPE :
            return this.getConfigMongo();
        case DatabaseTypeEnum.MSSQL_DB_TYPE :
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
    }
  }

  getConfigMongo(): MongoConfig {
    return {
        uri: this.get('MONGO_URI')
    }
  }

  getConfigMssql(): MssqlConfig {
    return {
        uri: this.get('MSSQL_URI')
    }
  }
  
}
