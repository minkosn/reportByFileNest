import ExcelJS from 'exceljs';
import { FileLoader } from './utility-classes/file-load.types';
declare class XlsFileLoader implements FileLoader<ExcelJS.Workbook> {
    private source;
    constructor(source: string | Buffer | NodeJS.ReadableStream);
    load(): Promise<ExcelJS.Workbook>;
}
export { FileLoader, XlsFileLoader };
