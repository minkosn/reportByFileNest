export interface FileLoader<T> {
    load(): Promise<T>;
}


// Единен формат за ред 
export interface DataRow { 
    [key: string]: any; // всяка колона е ключ-стойност 
} 
// Всеки парсър ще връща генератор от DataRow 
export interface FileParser { 
    parse(): AsyncGenerator<DataRow>; 
}

export enum ExtensionFileType {
    XLSX = 'xlsx',
    CSV = 'csv',
    HTML = 'html'
}

export interface DatabaseAdapter { 
    createTableForFile(tableName: string, columns: string[]): Promise<void>; 
    insertRow(tableName: string, row: any[]): Promise<void>; 
} 
