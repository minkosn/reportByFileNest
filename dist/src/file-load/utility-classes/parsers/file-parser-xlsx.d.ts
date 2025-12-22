import ExcelJS from "exceljs";
import { FileParser, DataRow } from '../file-load.types';
export declare class ExcelParser implements FileParser {
    private workbook;
    constructor(workbook: ExcelJS.Workbook);
    parse(): AsyncGenerator<DataRow>;
    getHeaders(): Promise<string[]>;
}
