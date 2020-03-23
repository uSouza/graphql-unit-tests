const { ApolloError } = require('apollo-server')

module.exports = (_, input, ctx) => {
  ctx.authService(ctx.user)
  if (!input || !input.id) throw new ApolloError('User ID is required', 'user_id_is_required')
  if (!ctx || !ctx.userRepository) throw new ApolloError('UserRepository is required', 'user_repository_is_required')
  return ctx.userRepository.findOneById(input.id)
}
