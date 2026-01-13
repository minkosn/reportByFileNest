import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { 
    DB_FACTORY,
    DB_STRATEGY,
    USER_REPOSITORY,
    PERSON_REPOSITORY 
} from './db.tokens';
import { DatabaseFactory } from './db-factory.interface';
import { DatabaseStrategy } from './db-strategy.interface';

//Postgres 
import { PostgresModule } from './postgres/postgres.module';
import { PostgresStrategy } from './postgres/postgres.strategy';
import { PostgresFactory } from './postgres/postgres.factory'; 

// Mongo 
import { MongoModule } from './mongo/mongo.module';
import { MongoStrategy } from './mongo/mongo.strategy';
import { MongoFactory } from './mongo/mongo.factory';

const dbType = process.env.DB_TYPE;

const dbModules = [];
const dbFactories = [];

if (dbType === 'postgres') {
    dbModules.push(PostgresModule);
    dbFactories.push(PostgresFactory);
} else if (dbType === 'mongo') {
    dbModules.push(MongoModule);
    dbFactories.push(MongoFactory);
}

@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [ConfigModule, ...dbModules],
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
                    useFactory: ( config: ConfigService, dbFactory: any): DatabaseFactory => { 
                        switch (config.getDbType()) { 
                            case 'postgres': return dbFactory as PostgresFactory;
                            case 'mongo': return dbFactory as MongoFactory;
                            case 'mssql': 
                            default: throw new Error('MSSQL not yet implemented'); 
                        } 
                    }, 
                    inject: [ConfigService, ...dbFactories] 
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
                }
            ],
            exports: [USER_REPOSITORY, PERSON_REPOSITORY]
        };
    }
}