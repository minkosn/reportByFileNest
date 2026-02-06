export interface DatabaseStrategy {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
