import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.providers';
import { Pool } from 'pg';
import { Worker } from 'worker_threads';
import * as path from 'path';

// Assuming the 'nodeTest' directory is at the root of the project.
// You might need to adjust the path depending on your project structure.
const transferFilesPath = path.resolve(process.cwd(), 'nodeTest/src/transferFiles.js');
const { TransferFiles } = require(transferFilesPath);


@Injectable()
export class FilesService {
  constructor(@Inject(PG_CONNECTION) private db: Pool) {}

  async handleFileUpload(year: string, month: string, files: Array<Express.Multer.File>, user: any) {
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
        await this.db.query('INSERT INTO "data".uploaded_files (original_file_name, file_name, file_path, uploaded_at, uploaded_from, batch_id) VALUES ($1, $2, $3, $4, $5, $6);',
            [
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
    // const fileListForImport = await renameUploadedFile(uploadedFiles); - This logic is now inside the worker

    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(process.cwd(), 'nodeTest/express-app/src/workers/importWorker.js'), {
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
      // This is a simplified version. In a real app, you'd use a more robust method
      // to clear a directory, like fs-extra.
      const fs = require('fs');
      const files = fs.readdirSync(uploadPath);
      for (const file of files) {
        fs.unlinkSync(path.join(uploadPath, file));
      }
      await this.db.query('DELETE FROM "data".uploaded_files;', []);
  }
}
