"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsFileLoader = exports.FileLoader = void 0;
const exceljs_1 = require("exceljs");
const file_load_types_1 = require("./utility-classes/file-load.types");
Object.defineProperty(exports, "FileLoader", { enumerable: true, get: function () { return file_load_types_1.FileLoader; } });
class XlsFileLoader {
    constructor(source) {
        this.source = source;
    }
    ;
    async load() {
        const workbook = new exceljs_1.default.Workbook();
        if (typeof this.source === 'string') {
            await workbook.xlsx.readFile(this.source);
        }
        else if (this.source instanceof Buffer) {
            await workbook.xlsx.load(this.source);
        }
        else if (this.source instanceof ReadableStream) {
            await workbook.xlsx.read(this.source);
        }
        else {
            throw new Error('Unsupported source type');
        }
        return workbook;
    }
}
exports.XlsFileLoader = XlsFileLoader;
//# sourceMappingURL=file-loader-xlsx.class.js.map