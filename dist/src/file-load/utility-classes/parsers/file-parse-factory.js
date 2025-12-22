"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserFactory = parserFactory;
const file_load_types_1 = require("../file-load.types");
const file_parser_xlsx_1 = require("./file-parser-xlsx");
const file_parser_csv_1 = require("./file-parser-csv");
const file_parser_html_1 = require("./file-parser-html");
function parserFactory(loaded, extension) {
    switch (extension) {
        case file_load_types_1.ExtensionFileType.XLSX: return new file_parser_xlsx_1.ExcelParser(loaded);
        case file_load_types_1.ExtensionFileType.CSV: return new file_parser_csv_1.CsvParser(loaded);
        case file_load_types_1.ExtensionFileType.HTML: return new file_parser_html_1.HtmlParser(loaded);
        default: throw new Error("Unsupported format");
    }
}
;
//# sourceMappingURL=file-parse-factory.js.map