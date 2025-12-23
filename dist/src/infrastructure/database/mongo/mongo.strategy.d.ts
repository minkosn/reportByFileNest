import { DatabaseStrategy } from '../db-strategy.interface';
export declare class MongoStrategy implements DatabaseStrategy {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
