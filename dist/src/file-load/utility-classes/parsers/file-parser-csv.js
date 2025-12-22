"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParser = void 0;
class CsvParser {
    constructor(records) {
        this.records = records;
    }
    async *parse() {
        for (const record of this.records) {
            yield record;
        }
    }
}
exports.CsvParser = CsvParser;
//# sourceMappingURL=file-parser-csv.js.map