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
  it('should return users', async () => {
    userRepository.findAll = jest.fn().mockImplementation(() => mockUsers)
    const user = await getUsers(null, null, { userRepository })
    expect(user).toEqual(mockUsers);
  })
})
