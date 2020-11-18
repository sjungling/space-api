import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { print } from 'graphql';
import { writeFileSync } from 'fs';


const typesArray = loadFilesSync(path.join(__dirname, 'schema'));
const typeDefz = mergeTypeDefs(typesArray);
const printedTypeDefs = print(typeDefz);
writeFileSync('./schema.graphql', printedTypeDefs);

const resolversArray = loadFilesSync(path.join(__dirname, './schema'), { extensions: ['ts'] });


export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers(resolversArray);
