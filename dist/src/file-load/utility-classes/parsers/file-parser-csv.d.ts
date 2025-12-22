import { FileParser, DataRow } from "../file-load.types";
export declare class CsvParser implements FileParser {
    private records;
    constructor(records: any[]);
    parse(): AsyncGenerator<DataRow>;
}
