"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FileLoadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoadService = void 0;
const common_1 = require("@nestjs/common");
const file_load_types_1 = require("./file-load.types");
let FileLoadService = FileLoadService_1 = class FileLoadService {
    constructor(options) {
        this.options = null;
        this.options = options;
    }
    static fromUploadFile(filePath) {
        return new FileLoadService_1({ typeLoading: file_load_types_1.FileLoaEnum.UploadFile, filePath });
    }
    static fromStreamFile(fileStream) {
        return new FileLoadService_1({ typeLoading: file_load_types_1.FileLoaEnum.StreamFile, fileStream });
    }
    static fromStreamFileInMemory(fileBuffer) {
        return new FileLoadService_1({ typeLoading: file_load_types_1.FileLoaEnum.StreamFileInMemory, fileBuffer });
    }
    getOptions() {
        return this.options;
    }
    loadFileFromUpload() {
        const { filePath } = this.options;
        console.log(`Loading file from upload at path: ${filePath}`);
    }
    loadFile() {
        switch (this.options.typeLoading) {
            case file_load_types_1.FileLoaEnum.UploadFile:
                this.loadFileFromUpload();
                break;
            case file_load_types_1.FileLoaEnum.StreamFile:
                this.loadFileFromStream();
                break;
            case file_load_types_1.FileLoaEnum.StreamFileInMemory:
                this.loadFileFromBuffer();
                break;
            default:
                throw new Error('Unsupported file loading type');
        }
    }
};
exports.FileLoadService = FileLoadService;
exports.FileLoadService = FileLoadService = FileLoadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], FileLoadService);
//# sourceMappingURL=file-load.service.js.map