import {IFileRepository } from "../../files/file.interfaces"; 
import { FileDetailEntity } from "./file.detail.entity";

export interface FileDetailRepository extends IFileRepository<FileDetailEntity>{};