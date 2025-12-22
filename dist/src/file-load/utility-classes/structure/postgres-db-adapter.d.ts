import { Pool } from 'pg';
import { DatabaseAdapter, FileParser, XlsxColumn } from '../file-load.types';
export declare const SCHEMA_IMPORT = "import";
export declare class PostgresDatabaseAdapter implements DatabaseAdapter {
    private db;
    constructor(db: Pool);
    createTableForFile(tableName: string, parser: FileParser): Promise<boolean>;
    insertRow(tableName: string, row: any[]): Promise<void>;
    convertColumnsToDbFormat(headers: XlsxColumn[]): string[];
}
