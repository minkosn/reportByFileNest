"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDatabaseAdapter = exports.SCHEMA_IMPORT = void 0;
const alphabet_converter_helper_1 = require("../helpers/alphabet-converter.helper");
exports.SCHEMA_IMPORT = 'import';
class PostgresDatabaseAdapter {
    constructor(db) {
        this.db = db;
    }
    async createTableForFile(tableName, parser) {
        const { rows: scheme } = await this.db.query(`SELECT EXISTS( SELECT 1 FROM information_schema.schemata WHERE schema_name = $1) as scheme`, [exports.SCHEMA_IMPORT]);
        if (!scheme[0].exists) {
            await this.db.query('CREATE SCHEMA import');
        }
        const { rows: tableExists } = await this.db.query(`SELECT EXISTS (SELECT 1
                                                            FROM information_schema.tables
                                                            WHERE table_schema = $1
                                                            AND table_name = $2) as tableExists`, [exports.SCHEMA_IMPORT, tableName]);
        if (!tableExists[0].exists) {
            const headers = await parser.getHeaders();
            const columnsDefinitions = this.convertColumnsToDbFormat(headers);
            const createTableQuery = `CREATE TABLE $1.$2 ($3)`;
            await this.db.query(createTableQuery, [exports.SCHEMA_IMPORT, tableName, columnsDefinitions]);
        }
        return true;
    }
    async insertRow(tableName, row) {
        const placeholders = row.map((_, index) => `$${index + 1}`).join(', ');
        const insertQuery = `INSERT INTO $1.$2 VALUES (${placeholders})`;
        await this.db.query(insertQuery, [exports.SCHEMA_IMPORT, tableName, ...row]);
    }
    convertColumnsToDbFormat(headers) {
        return headers.map(({ value, type }) => `${(0, alphabet_converter_helper_1.alphabetConverter)({ text: value })} TEXT`);
    }
}
exports.PostgresDatabaseAdapter = PostgresDatabaseAdapter;
//# sourceMappingURL=postgres-db-adapter.js.map