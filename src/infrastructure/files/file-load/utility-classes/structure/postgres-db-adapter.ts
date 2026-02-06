/* TO DO
import { Pool } from 'pg';
import { DatabaseAdapter, FileParser, XlsxColumn } from '../file-load.types';
import { alphabetConverter } from '../helpers/alphabet-converter.helper';

export const SCHEMA_IMPORT = 'import';

// will be managed from db handler factory depending from which DB provider will be used
export class PostgresDatabaseAdapter implements DatabaseAdapter { 
    //will be received from service that inject the PG_PROVIDER
    constructor(private db: Pool) {}
    
    async createTableForFile(tableName: string, parser: FileParser): Promise<boolean> { 
        const { rows: scheme } = await this.db.query(`SELECT EXISTS( SELECT 1 FROM information_schema.schemata WHERE schema_name = $1) as scheme`, [SCHEMA_IMPORT]);
        if (!scheme[0].exists) {
            await this.db.query('CREATE SCHEMA import');
        }

        const { rows: tableExists } = await this.db.query(`SELECT EXISTS (SELECT 1
                                                            FROM information_schema.tables
                                                            WHERE table_schema = $1
                                                            AND table_name = $2) as tableExists`
                                                          , [SCHEMA_IMPORT, tableName]);

        if (!tableExists[0].exists) { 
            const headers = await parser.getHeaders();
            
            const columnsDefinitions = this.convertColumnsToDbFormat(headers);//headers.map((header) => `"${alphabetConverter({text: header})}" TEXT`).join(', ');
            
            const createTableQuery = `CREATE TABLE $1.$2 ($3)`;
            await this.db.query(createTableQuery, [SCHEMA_IMPORT, tableName, columnsDefinitions]);
        } 
       
        return true;
    }   

    async insertRow(tableName: string, row: any[]): Promise<void> { 
        const placeholders = row.map((_, index) => `$${index + 1}`).join(', ');
        const insertQuery = `INSERT INTO $1.$2 VALUES (${placeholders})`;
        await this.db.query(insertQuery, [SCHEMA_IMPORT, tableName, ...row]);
    }

    convertColumnsToDbFormat(headers: XlsxColumn[]): string[] { 
        // TO DO - set string as : name_field TYPE SIZE , get information from 'col'
        return headers.map(({value, type}) => `${alphabetConverter({text: value})} TEXT`);
    }
}
    */