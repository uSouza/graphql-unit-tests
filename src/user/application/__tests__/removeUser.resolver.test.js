const { ApolloError } = require('apollo-server')

const RemoveUser = require('../removeUser.resolver')

const userRepository = {}

describe('Attempt to remove an user', () => {
  it('Should throw an Apollo Error when authUser is invalid', async () => {
    const expectedError = new ApolloError('Unauthorized user to resource', 'unauthorized')
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => { throw expectedError }),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    try {
      await RemoveUser(null, { id: null }, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })

  it('Should remove an user', async () => {
    userRepository.remove = jest.fn().mockImplementation(() => true)

    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }

    const params = {
      id: '5e57cd5831f6ae05d4cffaa8'
    }

    const user = await RemoveUser(null, params, ctx)
    expect(user).toBeTruthy()
  })

})