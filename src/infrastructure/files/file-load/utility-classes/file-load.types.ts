/* TO DO
export interface FileLoader<T> {
    load(): Promise<T>;
}

// Единен формат за ред 
export type DataRow = Record<string, any>; 
// Всеки парсър ще връща генератор от DataRow 
export interface FileParser { 
    parse(): AsyncGenerator<DataRow>; 
    getHeaders(): Promise<XlsxColumn[]>;
}

export enum ExtensionFileType {
    XLSX = 'xlsx',
    CSV = 'csv',
    HTML = 'html'
}

export interface DatabaseAdapter { 
    createTableForFile(tableName: string, parser: FileParser): Promise<boolean>; 
    insertRow(tableName: string, row: any[]): Promise<void>; 
    convertColumnsToDbFormat(columns: XlsxColumn[]): string[];
} 

export interface XlsxColumn {
    value: any; 
    type: string;
}
    */
