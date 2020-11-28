import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import { writeFileSync } from "fs";

const loadPath = path.join(__dirname, "../", "schema");
console.info(`Checking ${loadPath} for GraphQL Schema`);
const schemaFiles = loadFilesSync(loadPath, {
  extensions: ["graphql"],
});
const mergedSchemaDoc = mergeTypeDefs(schemaFiles);
const printedSchemaDoc = print(mergedSchemaDoc);
writeFileSync(path.join(__dirname, "../", "schema.graphql"), printedSchemaDoc);

export const typeDefs = mergedSchemaDoc;
