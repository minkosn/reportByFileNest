import { parse } from 'csv-parse/sync'; 
import { FileLoader } from './utility-classes/file-load.types';
import { Readable } from 'stream';

export class CsvFileLoader implements FileLoader<any[]> { 
    constructor(private source: string | Buffer | NodeJS.ReadableStream) {};

    async load(): Promise<any[]> { 
        let content: string; 
        
        if (typeof this.source === 'string') { 
            const fs = await import("fs/promises"); 
            content = (await fs.readFile(this.source)).toString(); 
        } else if (this.source instanceof Buffer) { 
            content = this.source.toString(); 
        } else if (this.source instanceof Readable) { //stream
            //content = await this.source.readStreamToString(this.source);
            this.source.on('data', (chunk) => {
                content += chunk;
            });
            this.source.on('end', () => {
                content = content.toString();
            });
        } else {
            throw new Error('Unsupported source type');
        }
        
        return parse(content, { columns: true }); 
    } 
}