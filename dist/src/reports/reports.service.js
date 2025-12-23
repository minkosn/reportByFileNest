"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const database_providers_1 = require("../infrastructure/database/database.providers");
let ReportsService = class ReportsService {
    constructor(db) {
        this.db = db;
        this.DISTRIBUTOR_LIST = ['fioniks', 'sofarma', 'sting', 'farmnet'];
        this.DISTRIBUTOR_FIELDS = '"Артикул", "Град", "СумаБезПроцент", "Процент", "СумаСПроцент", "ТоталПoПродукт", "batchid"';
    }
    getDistributorQuery(filters) {
        const SELECT_DISTRIBUTOR_FIELDS = `SELECT ${this.DISTRIBUTOR_FIELDS} `;
        const SELECT_DISTRIBUTOR_SALES = 'FROM report.fn_get_distributor_sales($1, $2, $3) ';
        const SELECT_FARMENT_SALES = 'FROM report.fn_get_farmnet_distributor($1, $2) ';
        if (filters.distributor === 'farmnet') {
            return [SELECT_DISTRIBUTOR_FIELDS + SELECT_FARMENT_SALES, [filters.product, filters.batchId]];
        }
        return [SELECT_DISTRIBUTOR_FIELDS + SELECT_DISTRIBUTOR_SALES, [filters.distributor, filters.product, filters.batchId]];
    }
    getAllDistributorQuery(filters) {
        let sql = '';
        const params = [];
        for (let index = 0; index < this.DISTRIBUTOR_LIST.length; index++) {
            let nextIndex = params.length;
            sql += `SELECT '${this.DISTRIBUTOR_LIST[index]}' AS distributor, ${this.DISTRIBUTOR_FIELDS}`;
            if (this.DISTRIBUTOR_LIST[index] === 'farmnet') {
                sql += ` FROM report.fn_get_farmnet_distributor($${++nextIndex}, $${++nextIndex}) `;
                params.push(filters.product, filters.batchId);
            }
            else {
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
    async getReportByDistributor(filters) {
        const [sql, params] = this.getDistributorQuery(filters);
        const result = await this.db.query(sql, params);
        return result?.rows || [];
    }
    async getReportAllDistributors(filters) {
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
    async getReportArticulCity(filters) {
        const { city = null, product = null, batchId } = filters;
        const sql = 'SELECT articul_name, city_name, amount FROM report.fn_report_articul_city_total($1, $2, $3);';
        try {
            const result = await this.db.query(sql, [Number(batchId), product, city]);
            return result?.rows || [];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_providers_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [pg_1.Pool])
], ReportsService);
//# sourceMappingURL=reports.service.js.map