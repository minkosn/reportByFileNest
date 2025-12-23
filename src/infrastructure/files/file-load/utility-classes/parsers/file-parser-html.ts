/*import cheerio from "cheerio";
import { FileParser, DataRow } from "../file-load.types";

export class HtmlParser implements FileParser {
  constructor(private html: string) {}

  async *parse(): AsyncGenerator<DataRow> {
    const $ = cheerio.load(this.html);
    $("table tr").each((_, tr) => {
      const row: DataRow = {};
      $(tr).find("td").each((i, td) => {
        row[`col${i}`] = $(td).text();
      });
      if (Object.keys(row).length) {
        // yield като генератор
      }
    });
  }
}
*/