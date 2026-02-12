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
    FILE_DETAIL_TYPE_REPOSITORY,
} from './db.tokens';
import { DatabaseFactory } from './db-factory.interface';
//import { DatabaseStrategy } from './db-strategy.interface';

//Postgres
import { PostgresModule } from './postgres/postgres.module';
import { PostgresFactory } from './postgres/postgres.factory';
//import { PostgresStrategy } from './postgres/postgres.strategy';

// Mongo
import { MongoModule } from './mongo/mongo.module';
import { MongoFactory } from './mongo/mongo.factory';
//import { MongoStrategy } from './mongo/mongo.strategy';

import { DatabaseTypeEnum as DB_TYPE } from '../../shared.enum';

const dbType = process.env.DB_TYPE;

//get specific Database module abd factory, depending of env config value 
const dbModule =
    dbType === DB_TYPE.POSTGRES_DB_TYPE //'postgres'
        ? PostgresModule
        : MongoModule;

const dbFactory = dbType === DB_TYPE.POSTGRES_DB_TYPE ? PostgresFactory : MongoFactory;
@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [ConfigModule, dbModule],
            providers: [
                //connection handled by TypeORM
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
                // DB Factory depending of active config by DB (postgres, mongo, ...) 
                //Specific DB factory is responsible to create the specific repos
                {
                    provide: DB_FACTORY,
                    useFactory: (config: ConfigService, dbFactory: DatabaseFactory): DatabaseFactory => {
                        switch (config.getDbType()) {
                            case DB_TYPE.POSTGRES_DB_TYPE:
                                return dbFactory as PostgresFactory;
                            case DB_TYPE.MONGO_DB_TYPE:
                                return dbFactory as MongoFactory;
                            case DB_TYPE.MSSQL_DB_TYPE:
                            default:
                                throw new Error('MSSQL not yet implemented');
                        }
                    },
                    inject: [ConfigService, dbFactory ],
                },
                //User repo, with dynamic creation depending of DB type 
                {
                    provide: USER_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createUserRepository(),
                    inject: [DB_FACTORY],
                },
                //Person repo, with dynamic creation depending of DB type 
                {
                    provide: PERSON_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createPersonRepository(),
                    inject: [DB_FACTORY],
                },
                //Auth repo, with dynamic creation depending of DB type 
                {
                    provide: AUTH_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createAuthRepository(),
                    inject: [DB_FACTORY],
                },
                //FileAction repo, with dynamic creation depending of DB type 
                {
                    provide: FILE_ACTION_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileActionRepository(),
                    inject: [DB_FACTORY],
                },
                {
                    provide: FILE_TO_ACTION_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileToActionRepository(),
                    inject: [DB_FACTORY],
                },
                //FileDetail repo, with dynamic creation depending of DB type 
                {
                    provide: FILE_DETAIL_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileDetailRepository(),
                    inject: [DB_FACTORY],
                },
                //FileDetailType repo, with dynamic creation depending of DB type 
                {
                    provide: FILE_DETAIL_TYPE_REPOSITORY,
                    useFactory: (factory: DatabaseFactory) => factory.createFileDetailTypeRepository(),
                    inject: [DB_FACTORY],
                },
            ],
            exports: [
                DB_FACTORY,
                USER_REPOSITORY,
                PERSON_REPOSITORY,
                AUTH_REPOSITORY,
                FILE_ACTION_REPOSITORY,
                FILE_TO_ACTION_REPOSITORY,
                FILE_DETAIL_REPOSITORY,
                FILE_DETAIL_TYPE_REPOSITORY,
            ],
        };
    }
}
