"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDestination = exports.FileTypeEnum = exports.FileLoaEnum = void 0;
const file_xlsx_1 = require("./file-xlsx");
var FileLoaEnum;
(function (FileLoaEnum) {
    FileLoaEnum["UploadFile"] = "uploadFile";
    FileLoaEnum["StreamFile"] = "streamFile";
    FileLoaEnum["StreamFileInMemory"] = "streamFileInMemory";
})(FileLoaEnum || (exports.FileLoaEnum = FileLoaEnum = {}));
;
;
;
var FileTypeEnum;
(function (FileTypeEnum) {
    FileTypeEnum["XLSX"] = "xlsx";
    FileTypeEnum["TXT"] = "txt";
    FileTypeEnum["CSV"] = "csv";
    FileTypeEnum["JSON"] = "json";
    FileTypeEnum["XML"] = "xml";
})(FileTypeEnum || (exports.FileTypeEnum = FileTypeEnum = {}));
class FileDestination {
    constructor(type) {
        this.type = type;
        this.handler = null;
        switch (type) {
            case FileTypeEnum.XLSX:
                this.handler = new file_xlsx_1.XlsFiles({ fileName: '' });
                break;
            case FileTypeEnum.TXT:
            case FileTypeEnum.CSV:
            case FileTypeEnum.JSON:
            case FileTypeEnum.XML:
            default:
                throw new Error('Unsupported file type');
        }
        this.handler;
    }
    getType() {
        return this.type;
    }
    getHandler() {
        return this.handler;
    }
}
exports.FileDestination = FileDestination;
//# sourceMappingURL=file-load.types.js.map