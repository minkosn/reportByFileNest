import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../infrastructure/database/database.providers';
import { ReportQueryDto } from './dto/report-query.dto';

@Injectable()
export class ReportsService {
    
    private readonly DISTRIBUTOR_LIST = ['fioniks', 'sofarma', 'sting', 'farmnet'];
    private readonly DISTRIBUTOR_FIELDS = '"Артикул", "Град", "СумаБезПроцент", "Процент", "СумаСПроцент", "ТоталПoПродукт", "batchid"';
    
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}

    private getDistributorQuery(filters: ReportQueryDto): [string, any[]] {
        const SELECT_DISTRIBUTOR_FIELDS = `SELECT ${this.DISTRIBUTOR_FIELDS} `;
        const SELECT_DISTRIBUTOR_SALES = 'FROM report.fn_get_distributor_sales($1, $2, $3) '; //distributor, product, batchId
        const SELECT_FARMENT_SALES = 'FROM report.fn_get_farmnet_distributor($1, $2) '; //product, batchId

        if (filters.distributor === 'farmnet') {
            return [SELECT_DISTRIBUTOR_FIELDS + SELECT_FARMENT_SALES, [filters.product, filters.batchId]];
        }
        return [SELECT_DISTRIBUTOR_FIELDS + SELECT_DISTRIBUTOR_SALES, [filters.distributor, filters.product, filters.batchId]];
    }

    private getAllDistributorQuery(filters: ReportQueryDto): [string, any[]] {
        let sql = '';
        const params = [];

        for (let index = 0; index < this.DISTRIBUTOR_LIST.length; index++) {
            let nextIndex = params.length;
            sql += `SELECT '${this.DISTRIBUTOR_LIST[index]}' AS distributor, ${this.DISTRIBUTOR_FIELDS}`;

            if (this.DISTRIBUTOR_LIST[index] === 'farmnet') {
                sql += ` FROM report.fn_get_farmnet_distributor($${++nextIndex}, $${++nextIndex}) `;
                params.push(filters.product, filters.batchId);
            } else {
                sql += ` FROM report.fn_get_distributor_sales($${++nextIndex}, $${++nextIndex}, $${++nextIndex}) `;
                params.push(this.DISTRIBUTOR_LIST[index], filters.product, filters.batchId);
            }
            if (index < this.DISTRIBUTOR_LIST.length - 1) {
                sql += ' UNION ';
            }
        }

        sql += ' ORDER BY 1, "Артикул", "Град" ';
        return [sql, params];
    }

    async getReportByDistributor(filters: ReportQueryDto) {
        const [sql, params] = this.getDistributorQuery(filters);
        const result = await this.db.query(sql, params);
        return result?.rows || [];
    }

    async getReportAllDistributors(filters: ReportQueryDto) {
        const [sql, params] = this.getAllDistributorQuery(filters);
        const result = await this.db.query(sql, params);
        return result?.rows || [];
    }

    async getReportNomenclatures() {
        try {
            const [distributors, cities, products, batches] = await Promise.all([
                this.db.query('SELECT "name" FROM report."distributors";', []),
                this.db.query(`
                    SELECT c.city_name AS name, c.is_main AS isMain, c.is_active AS active, 
                        cSub.city_name AS subCity
                        FROM report.cities c
                        LEFT JOIN report."cityToVilages" c2v ON c.is_main = true AND c2v."cityId" = c.id
                        LEFT JOIN report."cities" cSub ON cSub.id = c2v."vilageId"
                        WHERE c.is_main = true
                        ORDER BY c.id ASC`, []),
                this.db.query(`SELECT r."value" AS name, p2p.percent 
                    FROM map."dataToReport" r
                    LEFT JOIN map."productToPercent" p2p ON p2p."productId" = r.id
                    WHERE r.entity='product'
                    ORDER BY r."value"; `, []),
                this.db.query(`SELECT batchid
                    FROM report.ditributor_sales
                    GROUP BY batchid`, [])
            ]);
            return {
                distributors: distributors.rows,
                cities: cities.rows,
                products: products.rows,
                batches: batches.rows
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async getReportArticulCity(filters: ReportQueryDto) {
        const { city = null, product = null, batchId } = filters;
        const sql = 'SELECT articul_name, city_name, amount FROM report.fn_report_articul_city_total($1, $2, $3);'; //batchId, product, city 
        try {
            const result = await this.db.query(sql, [Number(batchId), product, city]);
            return result?.rows || [];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
