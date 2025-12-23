import { DatabaseStrategy } from '../db-strategy.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresStrategy implements DatabaseStrategy {
    async connect() { 
        // Usually handled by TypeORMModule.forRoot 
    } 
    async disconnect() { 
        // Usually handled by Nest lifecycle 
    }
}


