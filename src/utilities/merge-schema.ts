import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const loadPath = path.join(__dirname, "../", "schema");
console.info(`Checking ${loadPath} for GraphQL Schema`);
const schemaFiles = loadFilesSync(loadPath, {
  extensions: ["graphql"],
});
const mergedSchemaDoc = mergeTypeDefs(schemaFiles);

export const typeDefs = mergedSchemaDoc;
