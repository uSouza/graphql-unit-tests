module.exports = (_, __, { userRepository, authService, user }) => {
  authService(user)
  return userRepository.findAll()
}
