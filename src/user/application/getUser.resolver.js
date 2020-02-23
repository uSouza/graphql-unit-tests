module.exports = (_, { id }, { userRepository }) => {
  return userRepository.findOneById(id)
}
