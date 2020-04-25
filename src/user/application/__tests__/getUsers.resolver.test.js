const { ApolloError } = require('apollo-server')

const getUsers = require('../getUsers.resolver')

const userRepository = {}

const mockUsers = [
  {
    _id: '5e52ea89d572e200b83bec23',
    email: 'teste@mailinator.com',
    name: 'teste',
    deleted: null
  },
  {
    _id: '5e52ea89d572e200b83bec24',
    email: 'teste2@mailinator.com',
    name: 'teste2',
    deleted: null
  }
]

describe('Attempt to get users', () => {
  it('Should throw an Apollo Error when authUser is invalid', async () => {
    const expectedError = new ApolloError('Unauthorized user to resource', 'unauthorized')
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => { throw expectedError }),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    try {
      await getUsers(null, null, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })
  it('should return users', async () => {
    userRepository.findAll = jest.fn().mockImplementation(() => mockUsers)
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    const user = await getUsers(null, null, ctx)
    expect(user).toEqual(mockUsers);
  })
})
