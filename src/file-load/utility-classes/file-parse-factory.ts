import { FileParser, ExtensionFileType } from './file-load.types';
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