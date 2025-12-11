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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const database_providers_1 = require("../database/database.providers");
const pg_1 = require("pg");
const worker_threads_1 = require("worker_threads");
const path = require("path");
const transferFilesPath = path.resolve(process.cwd(), '../nodeTest/src/transferFiles.js');
const { TransferFiles } = require(transferFilesPath);
let FilesService = class FilesService {
    constructor(db) {
        this.db = db;
    }
    async handleFileUpload(year, month, files, user) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded.');
        }
        const newEntries = files.map(file => ({
            originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'),
            fileName: file.filename,
            path: file.path,
            importDate: new Date(),
            distributor: 'N/A',
            rowCount: 0,
            year,
            month
        }));
        for (const file of newEntries) {
            await this.db.query('INSERT INTO "data".uploaded_files (original_file_name, file_name, file_path, uploaded_at, uploaded_from, batch_id) VALUES ($1, $2, $3, $4, $5, $6);', [
                file.originalName,
                file.fileName,
                file.path,
                file.importDate,
                user.id,
                String(file.year).concat(file.month)
            ]);
        }
        return {
            message: 'Files uploaded successfully. Ready for import.',
            files: newEntries.map(f => ({ name: f.originalName, path: f.path }))
        };
    }
    async runImportWorker() {
        const uploadedFiles = await this.getUploadedFiles();
        return new Promise((resolve, reject) => {
            const worker = new worker_threads_1.Worker(path.resolve(process.cwd(), 'nodeTest/express-app/src/workers/importWorker.js'), {
                workerData: { files: uploadedFiles }
            });
            worker.on('message', (message) => {
                resolve({ message: 'Import process finished.', details: message });
            });
            worker.on('error', (error) => {
                reject({ message: 'Import process failed.', error: error.message });
            });
            worker.on('exit', (code) => {
                if (code !== 0)
                    console.warn(`Worker stopped with exit code ${code}`);
            });
        });
    }
    async getUploadedFiles() {
        const result = await this.db.query('SELECT original_file_name, file_name, file_path, uploaded_at, uploaded_from, batch_id FROM "data".uploaded_files ORDER BY uploaded_at DESC;', []);
        return result.rows.map(f => ({
            importDate: f.uploaded_at,
            distributor: f.uploaded_from,
            rowCount: f.row_count,
            originalName: f.original_file_name,
            fileName: f.file_name,
            filePath: f.file_path,
            batchId: f.batch_id
        }));
    }
    async getImportedFiles() {
        const result = await this.db.query('SELECT file_name, imported_at, imported_from, batch_id FROM "data".imported_files ORDER BY imported_at DESC;', []);
        return result.rows.map(f => ({
            importDate: f.imported_at,
            distributor: f.imported_from,
            rowCount: f.row_count,
            originalName: f.file_name
        }));
    }
    async clearUploads() {
        const uploadPath = path.resolve(process.cwd(), 'uploads');
        const fs = require('fs');
        const files = fs.readdirSync(uploadPath);
        for (const file of files) {
            fs.unlinkSync(path.join(uploadPath, file));
        }
        await this.db.query('DELETE FROM "data".uploaded_files;', []);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_providers_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [pg_1.Pool])
], FilesService);
//# sourceMappingURL=files.service.js.map