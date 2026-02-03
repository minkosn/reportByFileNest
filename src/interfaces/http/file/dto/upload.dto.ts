import { IsString, IsNotEmpty } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @IsString()
  @IsNotEmpty()
  readonly month: string;

  constructor() {
    this.year = new Date().getFullYear().toString();
    this.month = new Date().getMonth().toString();
  }
}
