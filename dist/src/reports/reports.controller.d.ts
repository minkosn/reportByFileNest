import { ReportsService } from './reports.service';
import { ReportQueryDto } from './dto/report-query.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getReportByDistributor(query: ReportQueryDto): Promise<any[]>;
    getReportAllDistributors(query: ReportQueryDto): Promise<any[]>;
    getReportNomenclatures(): Promise<{
        distributors: any[];
        cities: any[];
        products: any[];
        batches: any[];
    }>;
    getReportArticulCity(query: ReportQueryDto): Promise<any[]>;
}
