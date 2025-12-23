/*import { parse } from "csv-parse/sync";
import { FileParser, DataRow } from "../file-load.types";

export class CsvParser implements FileParser {
  constructor(private records: any[]) {}

  async *parse(): AsyncGenerator<DataRow> {
    for (const record of this.records) {
      yield record as DataRow;
    }
  }
}
*/