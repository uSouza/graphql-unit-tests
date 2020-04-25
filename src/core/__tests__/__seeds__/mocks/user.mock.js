const { encrypt } = require('../../../service/cryptService')

module.exports = [
  {
    email: 'test@mailinator.com',
    password: (encrypt('123456')).toString(),
    name: 'test',
  }
]
