import { FileRepository } from '../file.interfaces';
import { FileToActionEntity } from './file.to.action.entity';

//relation file m:1 Action
export type FileToActionRepository = FileRepository<FileToActionEntity>;
