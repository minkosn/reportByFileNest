import { FileLoader, DatabaseAdapter, ExtensionFileType, FileParser } from './file-load.types';
//import { parserFactory } from './file-parse-factory';


class FileProcessor { 
    constructor( 
        private loader: FileLoader<any>, // return Workbook 
        private parserFactory: Function, // return FileParser 
        private db: DatabaseAdapter, 
        private tableName: string 
    ) {};

    async process(fileExtension: ExtensionFileType) { 
        // 1. load file with loader 
        const loaded = await this.loader.load();

        // 2. Return generator with parser rows 
        const parser = this.parserFactory(loaded, fileExtension);
        
        // 3. Create table in the DB 
        await this.db.createTableForFile(this.tableName, ["dynamic columns"]);

        // 4. loop by rows and insert into DB 
        for await (const row of parser.parse()) { 
            await this.db.insertRow(this.tableName, Object.values(row)); 
        }
    } 
}