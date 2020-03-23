const { ApolloError } = require('apollo-server')

const getUser = require('../getUser.resolver')

const userRepository = {}

const mockUser = {
  _id: '5e52ea89d572e200b83bec23',
  email: 'teste@mailinator.com',
  name: 'teste',
  deleted: null
}

describe('Attempt to get an user', () => {
  it('Should throw an Apollo Error when authUser is invalid', async () => {
    const expectedError = new ApolloError('Unauthorized user to resource', 'unauthorized')
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => { throw expectedError }),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    try {
      await getUser(null, null, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })
  it('should throw an Apollo Error when user id is undefined', async () => {
    const expectedError = new ApolloError('User ID is required', 'user_id_is_required')
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    try {
      await getUser(null, null, ctx)
    } catch (err) {
      expect(err).toEqual(expectedError)
    }
  })
  it('should throw an Apollo Error when userRepository dependency is undefined', async () => {
    const expectedError = new ApolloError('UserRepository is required', 'user_repository_is_required')
    const ctx = {
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    try {
      await getUser(null, { id: mockUser._id }, ctx)
    } catch (err) {
      expect(err).toEqual(expectedError)
    }
  })
  it('should return an user', async () => {
    userRepository.findOneById = jest.fn().mockImplementation(() => mockUser)
    const ctx = {
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    const user = await getUser(null, { id: mockUser._id }, ctx)
    expect(user).toEqual(mockUser);
  })
})
