/* istanbul ignore file */
const GetUser = require('./getUser.resolver')
const GetUsers = require('./getUsers.resolver')
const MergeUser = require('./mergeUser.resolver')
const RemoveUser = require('./removeUser.resolver')

module.exports = {
  Query: {
    GetUser,
    GetUsers
  },
  Mutation: {
    MergeUser,
    RemoveUser
  },
  Subscription: {}
}
