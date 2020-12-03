import {join} from 'path';
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import {print} from "graphql";
import { writeFileSync } from "fs";

const SCHEMA_PACKAGE_PATH = join("api", "packages", "**/*.graphql");
const SCHEMA_DEST = join('schema.graphql');
export default (() => {
  console.info(`Searching ${SCHEMA_PACKAGE_PATH} for GraphQL type defs`);
  const typeDefs = mergeTypeDefs(loadFilesSync(SCHEMA_PACKAGE_PATH, {
    extensions: ["graphql"],
  }));
  
  const printedSchemaDoc = print(typeDefs);
  console.info(`Merging type definitions into ${SCHEMA_DEST}`);
  writeFileSync(SCHEMA_DEST, printedSchemaDoc);
})();
