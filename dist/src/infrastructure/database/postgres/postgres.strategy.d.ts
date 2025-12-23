import { DatabaseStrategy } from '../db-strategy.interface';
export declare class PostgresStrategy implements DatabaseStrategy {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
