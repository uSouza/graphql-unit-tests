const schemas = require('../config/apollo/availableSchemas')

module.exports = () => {
  const resolvers = schemas.map(schema => {
    return require(`../../${schema}/application`)
  })

  const domainResolvers = (resolvers, keyField) => {
    const agregator = {}
    for (const resolver of resolvers) {
      if (resolver.hasOwnProperty(keyField)) {
        Object.assign(agregator, resolver[keyField])
      }
    }
    return Object.keys(agregator).length > 0 ? agregator : false
  }

  const Schemas = {}
  for (const schema of schemas) {
    domainResolvers(resolvers, schema) ? Schemas[schema] = domainResolvers(resolvers, schema) : null  
  }

  domainResolvers(resolvers, 'Query') ? Schemas.Query = domainResolvers(resolvers, 'Query') : null
  domainResolvers(resolvers, 'Mutation') ? Schemas.Mutation = domainResolvers(resolvers, 'Mutation') : null
  domainResolvers(resolvers, 'Subscription') ? Schemas.Subscription = domainResolvers(resolvers, 'Subscription') : null

  return Schemas
}
