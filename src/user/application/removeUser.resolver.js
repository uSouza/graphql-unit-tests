module.exports = (_, { id }, { userRepository, authService, user }) => {
  authService(user)
  return userRepository.remove(id)
}
