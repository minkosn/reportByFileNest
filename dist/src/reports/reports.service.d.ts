import { Pool } from 'pg';
import { ReportQueryDto } from './dto/report-query.dto';
export declare class ReportsService {
    private db;
    private readonly DISTRIBUTOR_LIST;
    private readonly DISTRIBUTOR_FIELDS;
    constructor(db: Pool);
    private getDistributorQuery;
    private getAllDistributorQuery;
    getReportByDistributor(filters: ReportQueryDto): Promise<any[]>;
    getReportAllDistributors(filters: ReportQueryDto): Promise<any[]>;
    getReportNomenclatures(): Promise<{
        distributors: any[];
        cities: any[];
        products: any[];
        batches: any[];
    }>;
    getReportArticulCity(filters: ReportQueryDto): Promise<any[]>;
}
