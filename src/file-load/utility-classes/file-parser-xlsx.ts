import ExcelJS from "exceljs";
import { FileParser, DataRow } from "./file-load.types";

export class ExcelParser implements FileParser {
  constructor(private workbook: ExcelJS.Workbook) {}

  async *parse(): AsyncGenerator<DataRow> {
    const sheet = this.workbook.worksheets[0];
    const headerRow = sheet.getRow(1);
    const headers = headerRow.values as string[];

    for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) { 
        const row = sheet.getRow(rowNumber);
        const values = row.values as any[];
        const data: DataRow = {};
        headers.forEach((h, i) => { 
            if (h) data[h] = values[i];
        }); 
        yield data; 
    } 
  }
}