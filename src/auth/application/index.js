const SignIn = require('./signIn.resolver')
const RefreshToken = require('./refreshToken.resolver')

module.exports = {
  Query: {
    SignIn,
    RefreshToken
  },
  Mutation: {},
  Subscription: {}
}
