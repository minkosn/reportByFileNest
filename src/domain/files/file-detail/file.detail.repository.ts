import { IFileRepository } from '../../files/file.interfaces';
import { FileDetailEntity } from './file.detail.entity';

export type FileDetailRepository = IFileRepository<FileDetailEntity>;
