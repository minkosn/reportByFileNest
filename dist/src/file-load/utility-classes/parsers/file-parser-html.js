"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlParser = void 0;
const cheerio_1 = require("cheerio");
class HtmlParser {
    constructor(html) {
        this.html = html;
    }
    async *parse() {
        const $ = cheerio_1.default.load(this.html);
        $("table tr").each((_, tr) => {
            const row = {};
            $(tr).find("td").each((i, td) => {
                row[`col${i}`] = $(td).text();
            });
            if (Object.keys(row).length) {
            }
        });
    }
}
exports.HtmlParser = HtmlParser;
//# sourceMappingURL=file-parser-html.js.map