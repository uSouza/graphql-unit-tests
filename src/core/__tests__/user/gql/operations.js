const gql = require('graphql-tag')

const MERGE_USER = gql`
  mutation MergeUser($input: UserInput!){
    MergeUser(input: $input) {
      _id
      name
      email
    }
  }
`

const REMOVE_USER = gql`
  mutation RemoveUser($id: ID){
    RemoveUser(id: $id)
  }
`

const GET_USERS = gql`
  query GetUsers {
    GetUsers {
      _id
      email
      name
    }
  }
`

const GET_USER = gql`
  query GetUser($id: ID) {
    GetUser(id: $id) {
      _id
      email
      name
    }
  }
`

module.exports = {
  MERGE_USER,
  REMOVE_USER,
  GET_USERS,
  GET_USER
}
