const path = require("path");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync  } = require('@graphql-tools/load-files');

const loadedTypes = loadFilesSync(path.join(__dirname, "/**/*.typeDefs.js"));
console.log(loadedTypes);
console.log(1);
const loadedResolvers = loadFilesSync(path.join(__dirname, "/**/*.resolvers.js"));


export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

console.log(typeDefs,resolvers);

/*const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(loadedTypes, {all: true}),
  resolvers: mergeResolvers(loadedResolvers, {all: true})
});

console.log(schema);

module.exports = {
  schema
};*/
