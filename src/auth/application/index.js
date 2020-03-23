const SignIn = require('./signIn.resolver')
const RefreshToken = require('./refreshToken.resolver')

module.exports = {
  Query: {},
  Mutation: {
    SignIn,
    RefreshToken
  },
  Subscription: {}
}
