import * as ExcelJS from 'exceljs';
interface XlsFilesOptions {
    fileName: string;
    headerRowNumber?: number;
}
interface XlsFilesClass {
    loadSheetByNumber(sheetNumber: number): Promise<ExcelJS.Worksheet>;
    getRow(rowNumber: number): Promise<ExcelJS.Row>;
    getHeaderRow(): Promise<ExcelJS.Row>;
    getCell(row: ExcelJS.Row, indexCell: number): Promise<ExcelJS.Cell>;
    getCellWithValue(rowIndex: number, cellIndex: number): Promise<ExcelJS.Cell>;
    listHeaders(): Promise<Array<{
        fieldName: string | ExcelJS.CellRichText | null;
        type: string;
        length?: number;
    }>>;
    getValues(): Promise<any[][]>;
    load(): Promise<boolean>;
}
export declare class XlsFiles implements XlsFilesClass {
    private fileName;
    private workbook;
    private worksheet;
    private headerRowNumber;
    constructor({ fileName, headerRowNumber }: XlsFilesOptions);
    loadSheetByNumber(sheetNumber?: number): Promise<any>;
    getRow(rowNumber: any): Promise<any>;
    getHeaderRow(): Promise<any>;
    getCell(row: any, indexCell: any): Promise<any>;
    getCellWithValue(rowIndex: number, cellIndex: any): Promise<any>;
    listHeaders(): Promise<any[]>;
    _getValues(): Promise<any[]>;
    getValues(): Promise<any[]>;
    _3_getValues(): Promise<any>;
    loadFromFile(): Promise<boolean>;
    loadFromStream(fileStream: NodeJS.ReadableStream): Promise<boolean>;
    loadFromBuffer(buffer: Buffer): Promise<boolean>;
}
export {};
