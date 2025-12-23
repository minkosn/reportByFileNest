/*import ExcelJS from "exceljs";
import { FileParser, DataRow } from '../file-load.types';

// TO DO 
//1. Option to know on which row is the header
//2. Option to know from which row start data
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

  async getHeaders(): Promise<string[]> {
    const sheet = this.workbook.worksheets[0];
    const headerRow = sheet.getRow(1);
    return headerRow.values.map(value => alphabetConverter({text: value as string})) as string[];
  }
}*/