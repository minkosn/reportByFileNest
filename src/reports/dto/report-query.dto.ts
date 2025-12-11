import { IsString, IsOptional } from 'class-validator';

export class ReportQueryDto {
  @IsString()
  @IsOptional()
  readonly distributor?: string;

  @IsString()
  @IsOptional()
  readonly product?: string;

  @IsString()
  @IsOptional()
  readonly batchId?: string;

  @IsString()
  @IsOptional()
  readonly city?: string;
}
