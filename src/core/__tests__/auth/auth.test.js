const { createTestClient } = require('apollo-server-testing')

const server = require('../apolloServerTest')

const { SIGN_IN, REFRESH_TOKEN } = require('./gql/operations')

beforeAll(async () => {
  await server.runSeeds()
})

afterAll(async () => {
  await server.close()
})

describe('attempt to run auth context operations', () => {
  it('should run signIn operation', async () => {
    const { mutate } = createTestClient(await server.getApolloServer())
    const res = await mutate({
      mutation: SIGN_IN,
      variables: {
        input: {
          email: 'test@mailinator.com',
          password: '123456'
        }
      },
    })
    expectedResultProps = {
      data: {
        SignIn: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }
      }
    }
    expect(res).toMatchSnapshot(expectedResultProps)
  })

  it('should run refreshToken operation', async () => {
    const { mutate } = createTestClient(await server.getApolloServer())
    const login = await mutate({
      mutation: SIGN_IN,
      variables: {
        input: {
          email: 'test@mailinator.com',
          password: '123456'
        }
      },
    })
    const res = await mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        input: {
          refreshToken: login.data.SignIn.refreshToken
        }
      },
    })
    expectedResultProps = {
      data: {
        RefreshToken: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }
      }
    }
    expect(res).toMatchSnapshot(expectedResultProps)
  })
})
