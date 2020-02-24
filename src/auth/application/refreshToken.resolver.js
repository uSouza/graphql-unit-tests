const { ApolloError } = require('apollo-server')

module.exports = async (_, { input }, { jwtService }) => {
  try {
    const { refreshToken } = input  
    const { userId } = await jwtService.verify(refreshToken)
    return jwtService.generate(userId)
  } catch(error) {
    throw new ApolloError('Invalid refresh token', 'invalid_refresh_token')
  }
}
