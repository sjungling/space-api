import * as Knex from "knex";
import { join, resolve } from "path";
import { readFileSync, readdirSync } from "fs";
import parse from "csv-parse/lib/sync";

export async function seed(knex: Knex): Promise<void> {
  const CSV_REGEXP = /\.csv/;
  const DATA_SOURCES = join(__dirname, ".");
  console.info(`Looking in ${DATA_SOURCES}`);
  const files = readdirSync(DATA_SOURCES);
  const csv_files: string[] = files
    .map((file): string => {
      if (CSV_REGEXP.test(file)) {
        return file;
      }
    })
    .filter(Boolean);

  const resultset = csv_files.map((file: string) => {
    const resolved_file_path = resolve(__dirname, ".", file);
    const table_from_file = file.replace(CSV_REGEXP, "");
    const rows = parse(readFileSync(resolved_file_path), { columns: true });
    return {
      table: table_from_file,
      file: resolved_file_path,
      rows,
    };
  });

  await Promise.all(
    resultset.map(async (result) => {
      const headers = Object.keys(result.rows[0]);
      console.info(`Dropping table: ${result.table}`);
      await knex.schema.dropTableIfExists(result.table);
      console.info(`Creating table: ${result.table}`);
      await knex.schema.createTable(result.table, (table) => {
        headers.forEach((header) => {
          if (header === "id") {
            table.increments();
          } else {
            table.string(header);
          }
        });
      });
      console.info(`Loading data into ${result.table}`);

      await knex(result.table).insert(result.rows);
    })
  );
}
