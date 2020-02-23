module.exports = (_, { id }, { userRepository }) => {
  return userRepository.remove(id)
}
