module.exports = async (_, { input }, { userRepository }) => {
  if (input.id) {
    return userRepository.update(input.id , { ...input.data })
  }
  return userRepository.create(input.data)
}
