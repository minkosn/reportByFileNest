export interface FileLoader<T> {
    load(): Promise<T>;
}
export interface DataRow {
    [key: string]: any;
}
export interface FileParser {
    parse(): AsyncGenerator<DataRow>;
    getHeaders(): Promise<XlsxColumn[]>;
}
export declare enum ExtensionFileType {
    XLSX = "xlsx",
    CSV = "csv",
    HTML = "html"
}
export interface DatabaseAdapter {
    createTableForFile(tableName: string, parser: FileParser): Promise<boolean>;
    insertRow(tableName: string, row: any[]): Promise<void>;
    convertColumnsToDbFormat(columns: XlsxColumn[]): string[];
}
export type XlsxColumn = {
    value: any;
    type: string;
};
