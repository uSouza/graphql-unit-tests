const mongoClient = require('../config/mongo')(true)

const { ApolloServer } = require('apollo-server')
const { Types } = require('mongoose')
const seedsTests = require('./__seeds__/seedsTests')
const loadDomainSchemas = require('../util/schemaImport')
const loadDomainResolvers = require('../util/resolverImport')
const formatError = require('../config/apollo/formatError')
const availableSchemas = require('../config/apollo/availableSchemas')
const dependencyInjection = require('../middleware/dependencyInjection')

const defaultTestUser = {
  _id: Types.ObjectId("5ea4404affb1cd0064561c56"),
  email: "test@mailinator.com",
  name: "test",
}

class ApolloServerTest {
  constructor() {
    this.rootSchema = `
      schema {
        query: Query
        mutation: Mutation
      }
    `
    this.domainSchemas = this.getDomainSchemas()
    this.ctx = dependencyInjection()
  }
  

  getContext() {
    return { ...this.ctx, user: defaultTestUser }
  }

  getDomainSchemas() {
    return Promise.all(availableSchemas.concat('core').map(loadDomainSchemas))
  }

  async runSeeds() {
    await seedsTests(this.ctx).start()
  }

  async close() {
    await seedsTests(this.ctx).destroy()
    await mongoClient.close()
  }

  async getApolloServer() {
    return new ApolloServer({
      formatError,
      typeDefs: [this.rootSchema, ...(await this.getDomainSchemas())],
      resolvers: loadDomainResolvers(),
      formatResponse: response => response,
      context: () => this.getContext(),
    })
  }
}

module.exports = new ApolloServerTest()
