const { createTestClient } = require('apollo-server-testing')

const server = require('../apolloServerTest')

const {
  MERGE_USER,
  REMOVE_USER,
  GET_USERS,
  GET_USER
} = require('./gql/operations')

beforeAll(async () => {
  await server.runSeeds()
})

afterAll(async () => {
  await server.close()
})

describe('attempt to run user context operations', () => {
  it('should run mergeUser operation', async () => {
    const { mutate } = createTestClient(await server.getApolloServer())
    const res = await mutate({
      mutation: MERGE_USER,
      variables: {
        input: {
          data: {
            email: 'test2@mailinator.com',
            name: 'test2',
            password: '123456'
          }
        }
      },
    })
    expectedResultProps = {
      data: {
        MergeUser: {
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }
      }
    }
    expect(res).toMatchSnapshot(expectedResultProps)
  })

  it('should run removeUser operation', async () => {
    const { mutate } = createTestClient(await server.getApolloServer())
    const user = await mutate({
      mutation: MERGE_USER,
      variables: {
        input: {
          data: {
            email: 'test3@mailinator.com',
            name: 'test3',
            password: '123456'
          }
        }
      },
    })
    expectedResultProps = {
      data: {
        RemoveUser: expect.any(Boolean)
      }
    }
    const res = await mutate({
      mutation: REMOVE_USER,
      variables: {
        id: user.data.MergeUser._id
      },
    })

    expect(res).toMatchSnapshot(expectedResultProps)
  })

  it('should run getUsers operation', async () => {
    const { query } = createTestClient(await server.getApolloServer())
    const res = await query({
      query: GET_USERS
    })
    expectedResultProps = {
      _id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
    }
    expect(res.data.GetUsers[0]).toMatchSnapshot(expectedResultProps)
  })

  it('should run getUser operation', async () => {
    const { mutate, query } = createTestClient(await server.getApolloServer())
    const user = await mutate({
      mutation: MERGE_USER,
      variables: {
        input: {
          data: {
            email: 'test4@mailinator.com',
            name: 'test4',
            password: '123456'
          }
        }
      },
    })
    expectedResultProps = {
      data: {
        GetUser: {
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }
      }
    }
    const res = await query({
      mutation: GET_USER,
      variables: {
        id: user.data.MergeUser._id
      },
    })

    expect(res).toMatchSnapshot(expectedResultProps)
  })
})
