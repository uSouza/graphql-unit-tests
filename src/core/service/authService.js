const { ApolloError } = require('apollo-server')

module.exports = (user) => {
  if (!user) throw new ApolloError('Unauthorized user to resource', 'unauthorized')
  return true
}
