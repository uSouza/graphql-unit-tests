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
  it('should throw an Apollo Error when user id is undefined', async () => {
    const expectedError = new ApolloError('User ID is required', 'user_id_is_required')
    try {
      await getUser(null, null, null)
    } catch (err) {
      expect(err).toEqual(expectedError)
    }
  })
  it('should throw an Apollo Error when userRepository dependency is undefined', async () => {
    const expectedError = new ApolloError('UserRepository is required', 'user_repository_is_required')
    try {
      await getUser(null, { id: mockUser._id }, null)
    } catch (err) {
      expect(err).toEqual(expectedError)
    }
  })
  it('should return an user', async () => {
    userRepository.findOneById = jest.fn().mockImplementation(() => mockUser)
    const user = await getUser(null, { id: mockUser._id }, { userRepository })
    expect(user).toEqual(mockUser);
  })
})
