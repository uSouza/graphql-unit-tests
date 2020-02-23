const user = require('../../user/domain/model/user.model')
const userRepository = require('../../user/infrastructure/repository/user.repository')

module.exports = () => ({
  userRepository: new userRepository(user)
})
