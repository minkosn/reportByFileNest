/*
import { FileParser, ExtensionFileType } from '../file-load.types';
import { ExcelParser } from './file-parser-xlsx';
import { CsvParser } from './file-parser-csv';
import { HtmlParser } from './file-parser-html';


export function parserFactory(loaded: any, extension: ExtensionFileType): FileParser { 
    switch (extension) { 
        case ExtensionFileType.XLSX: return new ExcelParser(loaded); 
        case ExtensionFileType.CSV: return new CsvParser(loaded); 
        case ExtensionFileType.HTML: return new HtmlParser(loaded); 
        default: throw new Error("Unsupported format"); 
    } 
};

/* option two

import ExcelJS from "exceljs";

function parserFactory(loaded: any): FileParser {
  // ExcelJS Workbook
  if (loaded instanceof ExcelJS.Workbook) {
    return new ExcelParser(loaded);
  }

  // CSV records (array of objects)
  if (Array.isArray(loaded) && typeof loaded[0] === "object") {
    return new CsvParser(loaded);
  }

  // HTML string
  if (typeof loaded === "string" && loaded.trim().startsWith("<")) {
    return new HtmlParser(loaded);
  }

  throw new Error("Unsupported loaded file type");
}
 */