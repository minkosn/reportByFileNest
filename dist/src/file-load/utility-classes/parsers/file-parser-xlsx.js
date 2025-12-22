"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelParser = void 0;
class ExcelParser {
    constructor(workbook) {
        this.workbook = workbook;
    }
    async *parse() {
        const sheet = this.workbook.worksheets[0];
        const headerRow = sheet.getRow(1);
        const headers = headerRow.values;
        for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) {
            const row = sheet.getRow(rowNumber);
            const values = row.values;
            const data = {};
            headers.forEach((h, i) => {
                if (h)
                    data[h] = values[i];
            });
            yield data;
        }
    }
    async getHeaders() {
        const sheet = this.workbook.worksheets[0];
        const headerRow = sheet.getRow(1);
        return headerRow.values.map(value => alphabetConverter({ text: value }));
    }
}
exports.ExcelParser = ExcelParser;
//# sourceMappingURL=file-parser-xlsx.js.map