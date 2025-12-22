import { FileParser, DataRow } from "../file-load.types";
export declare class HtmlParser implements FileParser {
    private html;
    constructor(html: string);
    parse(): AsyncGenerator<DataRow>;
}
