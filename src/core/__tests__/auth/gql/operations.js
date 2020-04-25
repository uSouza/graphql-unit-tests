const gql = require('graphql-tag')

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!){
    SignIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`

const REFRESH_TOKEN = gql`
  mutation RefreshToken($input: RefreshTokenInput!){
    RefreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`

module.exports = { SIGN_IN, REFRESH_TOKEN }
