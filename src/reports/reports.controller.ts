import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { ReportQueryDto } from './dto/report-query.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('distributor')
  getReportByDistributor(@Query() query: ReportQueryDto) {
    return this.reportsService.getReportByDistributor(query);
  }

  @Get('all')
  getReportAllDistributors(@Query() query: ReportQueryDto) {
    return this.reportsService.getReportAllDistributors(query);
  }

  @Get('nomenclatures')
  getReportNomenclatures() {
    return this.reportsService.getReportNomenclatures();
  }

  @Get('articul-city')
  getReportArticulCity(@Query() query: ReportQueryDto) {
    return this.reportsService.getReportArticulCity(query);
  }
}
