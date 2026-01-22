import { IFileRepository } from '../file.interfaces';
import { FileToActionEntity } from './file.to.action.entity';

//relation file m:1 Action
export interface FileToActionRepository extends IFileRepository<FileToActionEntity> {};