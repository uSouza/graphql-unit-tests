const { ApolloError } = require('apollo-server')

const dependencyInjection = require('../../middleware/dependencyInjection')

module.exports = async (req) => {
  try {
    const ctx = await dependencyInjection()
    const token = req.headers && req.headers.authorization
    const jwtDecoded = token && token !== 'null' && await ctx.jwtService.verify(token)
    if (jwtDecoded && jwtDecoded.userId) {
      const user = await ctx.userRepository.findOneById(jwtDecoded.userId)
      if (!user) throw new ApolloError('User not found', 'user_not_found')
      return { ...ctx, user }
    }
    return { ...ctx, user: null }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') throw new ApolloError('Invalid token', 'invalid_token')
    throw err
  }
}
