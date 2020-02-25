const { ApolloError } = require('apollo-server')

const dependencyInjection = require('../../middleware/dependencyInjection')

module.exports = async (req) => {
  try {
    const ctx = await dependencyInjection()
    const token = req.headers.authorization
    const user = token ? await ctx.jwtService.verify(token) : null
    return { ...ctx, user }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new ApolloError('Invalid token', 'invalid_token')
    }
    throw err
  }
}
