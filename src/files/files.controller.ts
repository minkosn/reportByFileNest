import { Controller, Get, Post, UseGuards, UseInterceptors, UploadedFiles, Body, Request } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { UploadDto } from './dto/upload.dto';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() uploadDto: UploadDto, @Request() req) {
    return this.filesService.handleFileUpload(uploadDto.year, uploadDto.month, files, req.user);
  }

  @Post('import')
  async importFiles() {
    return this.filesService.runImportWorker();
  }

  @Post('clear')
  async clear() {
    return this.filesService.clearUploads();
  }

  @Get('imported')
  async getImportedFiles() {
    return this.filesService.getImportedFiles();
  }

  @Get('uploaded')
  async getUploadedFiles() {
    return this.filesService.getUploadedFiles();
  }
}
