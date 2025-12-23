/*import ExcelJS from 'exceljs'; 
import { FileLoader } from './utility-classes/file-load.types';

class XlsFileLoader implements FileLoader<ExcelJS.Workbook> {
    constructor(private source: string | Buffer | NodeJS.ReadableStream) {};
        
    async load(): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();
        
        if (typeof this.source === 'string') {
            // load from file path
            await workbook.xlsx.readFile(this.source);
        } else if (this.source instanceof Buffer) {
            // load from buffer
            await workbook.xlsx.load(this.source);
        } else if (this.source instanceof ReadableStream) { //stream
            // load from stream
            await workbook.xlsx.read(this.source);
        } else {
            throw new Error('Unsupported source type');
        }

        return workbook;
    }
}

export { FileLoader, XlsFileLoader };
*/