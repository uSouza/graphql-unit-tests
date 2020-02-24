const user = require('../../user/domain/model/user.model')
const userRepository = require('../../user/infrastructure/repository/user.repository')
const cryptService = require('../service/cryptService')
const jwtService = require('../service/jwtService')

module.exports = () => ({
  userRepository: new userRepository(user),
  cryptService,
  jwtService
})
