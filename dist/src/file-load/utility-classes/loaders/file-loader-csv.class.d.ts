import { FileLoader } from './utility-classes/file-load.types';
export declare class CsvFileLoader implements FileLoader<any[]> {
    private source;
    constructor(source: string | Buffer | NodeJS.ReadableStream);
    load(): Promise<any[]>;
}
