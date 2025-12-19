export declare enum FileLoaEnum {
    UploadFile = "uploadFile",
    StreamFile = "streamFile",
    StreamFileInMemory = "streamFileInMemory"
}
export type FileManagementType = FileLoaEnum.UploadFile | FileLoaEnum.StreamFile | FileLoaEnum.StreamFileInMemory;
interface UploadFileOptions {
    typeLoading: FileLoaEnum.UploadFile;
    filePath: string;
}
interface StreamFileOptions {
    typeLoading: FileLoaEnum.StreamFile;
    fileStream: NodeJS.ReadableStream;
}
interface StreamFileInMemoryOptions {
    typeLoading: FileLoaEnum.StreamFileInMemory;
    fileBuffer: Buffer;
}
export type FileLoadOptions = UploadFileOptions | StreamFileOptions | StreamFileInMemoryOptions;
export declare enum FileTypeEnum {
    XLSX = "xlsx",
    TXT = "txt",
    CSV = "csv",
    JSON = "json",
    XML = "xml"
}
export declare class FileDestination {
    private type;
    private handler;
    constructor(type: FileTypeEnum);
    getType(): FileTypeEnum;
    getHandler(): any;
}
export {};
