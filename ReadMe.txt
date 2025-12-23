7. Postgres implementation (TypeORM example)


v 0.0.0 - Work as use worker for import files

1. To upgrade node to LST version, run:
   nvm install --lts
   nvm use --lts

TO DO 
=========
1. in database 
1.1 Add init DB structure
1.2 refactor all modules where is used directly PgSQL and replace in 'database.service' that will call different classes with adapters.
Like class InitDBStructure with adapters for PgSQL, Mongo,....  

Flow 
1. LoadFile
    1.1 load from folder
    1.2 load from stream
    1.3 load from buffer
2. PreProcessFile
    2.1 validate file
    2.2 transform file
    2.1 DB(persistent).PreProcessFile
3. ImportFile
4. postProcessFile
    4.2 archive file
    4.3 move file to another folder
    4.2 DB(persistent).postProcessFile

   Design import file (one by one):
   type LoadingFile = 'uploadFile' | 'streamFile' | 'streamFileInMemory';{
   
   Interface ILoadFile {
    loadFile(): LoadingFile;
   }

   Class LoadFile {
    constructor(typeLoading: LoadingFile, filePath?: string, fileContent?: Buffer | stream.Readable) {
        this.filePath = filePath;
    }

    loadFile() {
        switch (this.typeLoading) {
            case 'uploadFile':
                // logic to load file via upload
                break;
            case 'streamFile':
                // logic to load file via stream
                break;
            case 'streamFileInMemory':
                // logic to load file via in-memory stream
                break;
            default:
                throw new Error('Invalid loading type');
        }
    }
   } 


   