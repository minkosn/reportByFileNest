"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileProcessor {
    constructor(loader, parserFactory, db, tableName) {
        this.loader = loader;
        this.parserFactory = parserFactory;
        this.db = db;
        this.tableName = tableName;
    }
    ;
    async process(fileExtension) {
        const loaded = await this.loader.load();
        const parser = await this.parserFactory(loaded, fileExtension);
        await this.db.createTableForFile(this.tableName, parser);
        for await (const row of parser.parse()) {
            await this.db.insertRow(this.tableName, Object.values(row));
        }
    }
}
//# sourceMappingURL=file-processor.class.js.map