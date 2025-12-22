import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { DB_FACTORY, DB_STRATEGY, USER_REPOSITORY } from './db.tokens';
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

@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
    return {
        module: DatabaseModule,
        imports: [ConfigModule, PostgresModule, MongoModule],
        providers: [ 
            { 
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
            },
            { 
                provide: DB_FACTORY,
                useFactory: ( config: ConfigService, postgresFactory: PostgresFactory, mongoFactory: MongoFactory): DatabaseFactory => { 
                    switch (config.getDbType()) { 
                        case 'postgres': return postgresFactory;
                        case 'mongo': return mongoFactory;
                        case 'mssql': 
                        default: throw new Error('MSSQL not yet implemented'); 
                    } 
                }, 
                inject: [ConfigService, PostgresFactory, MongoFactory] 
            },
            { 
                provide: USER_REPOSITORY,
                useFactory: (factory: DatabaseFactory) => factory.createUserRepository(),
                inject: [DB_FACTORY] 
            },
        ],
        exports: [USER_REPOSITORY]
    };
  }
}