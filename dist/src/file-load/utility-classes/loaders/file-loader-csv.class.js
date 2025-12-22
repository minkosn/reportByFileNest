"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileLoader = void 0;
const sync_1 = require("csv-parse/sync");
const stream_1 = require("stream");
class CsvFileLoader {
    constructor(source) {
        this.source = source;
    }
    ;
    async load() {
        let content;
        if (typeof this.source === 'string') {
            const fs = await Promise.resolve().then(() => require("fs/promises"));
            content = (await fs.readFile(this.source)).toString();
        }
        else if (this.source instanceof Buffer) {
            content = this.source.toString();
        }
        else if (this.source instanceof stream_1.Readable) {
            this.source.on('data', (chunk) => {
                content += chunk;
            });
            this.source.on('end', () => {
                content = content.toString();
            });
        }
        else {
            throw new Error('Unsupported source type');
        }
        return (0, sync_1.parse)(content, { columns: true });
    }
}
exports.CsvFileLoader = CsvFileLoader;
//# sourceMappingURL=file-loader-csv.class.js.map