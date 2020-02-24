const { ApolloError } = require('apollo-server')

module.exports = async (_, { input }, { userRepository, cryptService, jwtService }) => {
  const { email, password } = input
  
  const user = await userRepository.findOneByEmail(email)
  if (!user) throw new ApolloError('User not found', 'user_not_found')
  
  const decryptPwd = await cryptService.decrypt(user.password)

  if (decryptPwd !== password) throw new ApolloError('Invalid credentials', 'invalid_credentials')
  
  return jwtService.generate(user._id)
}
