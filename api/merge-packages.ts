import { join } from "path";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const SCHEMA_PACKAGE_PATH = join(__dirname, "packages");

export const typeDefs = mergeTypeDefs(
  loadFilesSync(SCHEMA_PACKAGE_PATH, {
    extensions: ["graphql"],
  })
);
export const resolvers = mergeResolvers(
  loadFilesSync(SCHEMA_PACKAGE_PATH, {
    extensions: ["ts", "js"],
  })
);
