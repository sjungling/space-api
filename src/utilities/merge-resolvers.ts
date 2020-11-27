import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolverFiles = loadFilesSync(path.join(__dirname, "..", "./schema"), {
  extensions: ["ts", "js"],
});

export const resolvers = mergeResolvers(resolverFiles);
