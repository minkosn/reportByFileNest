import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { 
    DB_FACTORY,
    //DB_STRATEGY,
    USER_REPOSITORY,
    PERSON_REPOSITORY,
    AUTH_REPOSITORY,
    FILE_ACTION_REPOSITORY,
    FILE_TO_ACTION_REPOSITORY,
    FILE_DETAIL_REPOSITORY,
    FILE_DETAIL_TYPE_REPOSITORY 
} from './db.tokens';
import { DatabaseFactory } from './db-factory.interface';
//import { DatabaseStrategy } from './db-strategy.interface';

//Postgres 
import { PostgresModule } from './postgres/postgres.module';
//import { PostgresStrategy } from './postgres/postgres.strategy';
import { PostgresFactory } from './postgres/postgres.factory'; 

// Mongo 
import { MongoModule } from './mongo/mongo.module';
//import { MongoStrategy } from './mongo/mongo.strategy';
import { MongoFactory } from './mongo/mongo.factory';
import { DatabaseTypeEnum as DB_TYPE} from '../../shared.enum';

const dbType = process.env.DB_TYPE;

//const dbModules = [];
const dbModule = dbType === DB_TYPE.POSTGRES_DB_TYPE //'postgres' 
    ? PostgresModule
    : MongoModule; 
//const dbFactories = [];
const dbFactory = dbType === DB_TYPE.POSTGRES_DB_TYPE 
    ? PostgresFactory
    : MongoFactory;
/*
if (dbType === 'postgres') {
    dbModules.push(PostgresModule);
    dbFactories.push(PostgresFactory);
} else if (dbType === 'mongo') {
    dbModules.push(MongoModule);
    dbFactories.push(MongoFactory);
}
*/
@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [ConfigModule, dbModule/*...dbModules*/],
            providers: [ 
                /*{ 
                    provide: DB_STRATEGY,
                    useFactory: (config: ConfigService) => { 
                        switch (config.getDbType()) { 
                            case 'postgres': return new PostgresStrategy();
                            case 'mongo': return new MongoStrategy();
                            case 'mssql': 
                            default: throw new Error('MSSQL not yet implemented'); 
                        } 
                    },
                    inject: [ConfigService] 
                },*/
                { 
                    provide: DB_FACTORY,
                    useFactory: ( config: ConfigService, dbFactory: DatabaseFactory): DatabaseFactory => { 
                        switch (config.getDbType()) { 
                            case DB_TYPE.POSTGRES_DB_TYPE: return dbFactory as PostgresFactory;
                            case DB_TYPE.MONGO_DB_TYPE: return dbFactory as MongoFactory;
                            case DB_TYPE.MSSQL_DB_TYPE: 
                            default: throw new Error('MSSQL not yet implemented'); 
                        } 
                    }, 
                    inject: [ConfigService, dbFactory/*...dbFactories*/] 
                },
                { 
                    provide: USER_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createUserRepository(),
                    inject: [DB_FACTORY] 
                },
                {
                    provide: PERSON_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createPersonRepository(),
                    inject: [DB_FACTORY]
                },
                {
                    provide: AUTH_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createAuthRepository(),
                    inject: [DB_FACTORY]
                },
                {
                    provide: FILE_ACTION_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileActionRepository(),
                    inject: [DB_FACTORY]
                },
                {
                    provide: FILE_TO_ACTION_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileToActionRepository(),
                    inject: [DB_FACTORY]
                },
                {
                    provide: FILE_DETAIL_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileDetailRepository(),
                    inject: [DB_FACTORY]
                },
                {
                    provide: FILE_DETAIL_TYPE_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileDetailTypeRepository(),
                    inject: [DB_FACTORY]
                }
    
            ],
            exports: [
                DB_FACTORY,
                USER_REPOSITORY,
                PERSON_REPOSITORY,
                AUTH_REPOSITORY,
                FILE_ACTION_REPOSITORY,
                FILE_TO_ACTION_REPOSITORY,
                FILE_DETAIL_REPOSITORY,
                FILE_DETAIL_TYPE_REPOSITORY
            ]
        };
    }
}