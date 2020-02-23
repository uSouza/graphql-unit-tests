const { ApolloServer } = require('apollo-server')

const loadDomainSchemas = require('../../util/schemaImport')
const loadDomainResolvers = require('../../util/resolverImport')
const context = require('./context')
const formatError = require('./formatError')
const availableSchemas = require('./availableSchemas')

module.exports = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const domainSchemas = await Promise.all(availableSchemas.concat('core').map(loadDomainSchemas))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...domainSchemas],
    resolvers: loadDomainResolvers(),
    formatError,
    formatResponse: response => response,
    context: async ({ req }) => await context(req),
  })

  return server
}
