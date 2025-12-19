"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsFiles = void 0;
const ExcelJS = require("exceljs");
class XlsFiles {
    constructor({ fileName, headerRowNumber = 1 }) {
        this.fileName = fileName;
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = null;
        this.headerRowNumber = headerRowNumber;
    }
    async loadSheetByNumber(sheetNumber = 0) {
        if (!this.workbook)
            throw new Error('Not assigned workbook');
        this.worksheet = this.workbook.worksheets[sheetNumber];
        return this.worksheet;
    }
    async getRow(rowNumber) {
        if (!this.worksheet)
            throw new Error('Not assigned worksheet');
        if (rowNumber < 1 || rowNumber > this.worksheet.actualRowCount)
            throw new Error(`Invalid row number ${rowNumber}`);
        return this.worksheet.getRow(rowNumber);
    }
    async getHeaderRow() {
        return this.getRow(this.headerRowNumber);
    }
    async getCell(row, indexCell) {
        return row.getCell(indexCell);
    }
    async getCellWithValue(rowIndex = 1, cellIndex) {
        let cellData = null;
        let isValid = false;
        let rowCounter = rowIndex - 1;
        do {
            rowCounter++;
            const rowData = await this.getRow(rowCounter);
            cellData = await this.getCell(rowData, cellIndex);
            isValid = ![ExcelJS.ValueType.Null, ExcelJS.ValueType.Error].includes(cellData.type);
        } while (!isValid && rowCounter < this.worksheet.actualRowCount);
        return cellData;
    }
    async listHeaders() {
        const rowHeader = await this.getHeaderRow();
        const rowDataNumber = this.headerRowNumber + 1;
        const rowData = await this.getRow(rowDataNumber);
        const headers = [];
        for (let index = 1; index <= this.worksheet.actualColumnCount; index++) {
            const cell = await this.getCell(rowHeader, index);
            const cellData = await this.getCellWithValue(rowDataNumber, index);
            const type = Object.entries(ExcelJS.ValueType).find(([key, value]) => value === cellData.type)?.[0] || 'unknown';
            headers.push({
                fieldName: cell.value,
                type,
                length: cellData.value?.length
            });
        }
        return headers;
    }
    async _getValues() {
        let values = [];
        for (let indexRow = this.headerRowNumber + 1; indexRow <= this.worksheet.actualRowCount; indexRow++) {
            const rowData = await this.getRow(indexRow);
            let rowValues = [];
            for (let indexCell = 1; indexCell <= this.worksheet.actualColumnCount; indexCell++) {
                const cellData = await this.getCell(rowData, indexCell);
                rowValues.push(cellData.value);
            }
            console.log('Get Values row number=', indexRow);
            values.push(rowValues);
        }
        return values;
    }
    async getValues() {
        let values = [];
        const headerRowNumber = this.headerRowNumber;
        const actualColumnCount = this.worksheet.actualColumnCount;
        this.worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber !== headerRowNumber) {
                let cellValues = [];
                const rowValuesRaw = row.values.slice(1, actualColumnCount + 1);
                for (let index = 0; index < actualColumnCount; index++) {
                    cellValues.push(rowValuesRaw[index] === undefined ? null : rowValuesRaw[index]);
                }
                values.push(cellValues);
            }
        });
        return values;
    }
    async _3_getValues() {
        const [emptyRow, headerRow, ...dataRows] = this.worksheet.getSheetValues();
        return dataRows;
    }
    async loadFromFile() {
        try {
            await this.workbook.xlsx.readFile(this.fileName);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async loadFromStream(fileStream) {
        try {
            await this.workbook.xlsx.readFile(fileStream);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async loadFromBuffer(buffer) {
        try {
            await this.workbook.xlsx.readFile(buffer);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.XlsFiles = XlsFiles;
//# sourceMappingURL=file-xlsx.js.map