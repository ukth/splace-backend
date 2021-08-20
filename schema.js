const path = require("path");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync  } = require('@graphql-tools/load-files');

const loadedTypes = loadFilesSync(path.join(__dirname, "/**/*.typeDefs.js"));
const loadedResolvers = loadFilesSync(path.join(__dirname, "/**/*.resolvers.js"));


export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

