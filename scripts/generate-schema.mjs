import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import graphql from "graphql";
import { writeFileSync } from "fs";

const loadPath = 'src/schema/**/*.graphql';
console.info(`Checking ${loadPath} for GraphQL Schema`);
const schemaFiles = loadFilesSync(loadPath, {
  extensions: ["graphql"],
});
const mergedSchemaDoc = mergeTypeDefs(schemaFiles);
const printedSchemaDoc = graphql.print(mergedSchemaDoc);
writeFileSync("schema.graphql", printedSchemaDoc);
