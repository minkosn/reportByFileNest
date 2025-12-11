import { Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '../config/config.service';

export const PG_CONNECTION = 'PG_CONNECTION';

export const databaseProviders: Provider[] = [
  {
    provide: PG_CONNECTION,
    useFactory: (configService: ConfigService) => {
      return new Pool({
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        user: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      });
    },
    inject: [ConfigService],
  },
];
