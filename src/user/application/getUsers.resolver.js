module.exports = (_, __, { userRepository }) => {
  return userRepository.findAll()
}
