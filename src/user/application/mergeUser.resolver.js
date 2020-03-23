const { ApolloError } = require('apollo-server')

module.exports = async (_, { input }, { userRepository, cryptService, authService, user, userModel }) => {
  authService(user)

  const errors = (userModel.hydrate(input.data)).validateSync()
  if (errors) throw new ApolloError(JSON.stringify(errors.errors), 'validation_errors')

  if (input.id) {
    return userRepository.update(input.id, input.data)
  }
  const { password } = input.data
  const data = {
    ...input.data,
    password: cryptService.encrypt(password)
  }
  return userRepository.create(data)
}
