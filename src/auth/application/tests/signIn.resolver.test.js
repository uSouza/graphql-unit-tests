const { ApolloError } = require('apollo-server')

const SignIn = require('../signIn.resolver')

const userRepository = {}

describe('Attempt to signIn', () => {
  it('Should throw an Apollo Error when user not found', async () => {
    const expectedError = new ApolloError('User not found', 'user_not_found')
    userRepository.findOneByEmail = jest.fn().mockImplementation(() => false)
    const ctx = {
      userRepository,
      cryptService: null,
      jwtService: null,
    }
    try {
      const input = {
        email: 'teste@mailinator.com',
        password: '123456'
      }
      await SignIn(null, { input }, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })
  it('Should throw an Apollo Error when user password is invalid', async () => {
    const mockUser = {
      _id: 10,
      password: '12345678'
    }
    const expectedError = new ApolloError('Invalid credentials', 'invalid_credentials')

    userRepository.findOneByEmail = jest.fn().mockImplementation(() => mockUser)

    const cryptService = {}
    cryptService.decrypt = jest.fn().mockImplementation(() => '12345678')

    const ctx = {
      userRepository,
      cryptService,
      jwtService: null,
    }
    try {
      const input = {
        email: 'teste@mailinator.com',
        password: '123456'
      }
      await SignIn(null, { input }, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })
  it('Should return authentication tokens', async () => {
    const mockSigIn = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NDk3MDAyNX0.u1cANJHizNaHqwEhE9b4WD47ACXvNWussWZyxCCL9SM',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NTU3MTIyNX0.OjciNjW100pILF9PshSWVf_smJlZBVa5YiEjzi_8YD0'
    }
    const mockUser = {
      _id: 10,
      password: '123456'
    }

    userRepository.findOneByEmail = jest.fn().mockImplementation(() => mockUser)

    const cryptService = {}
    cryptService.decrypt = jest.fn().mockImplementation(() => '123456')

    const jwtService = {}
    jwtService.generate = jest.fn().mockImplementation(() => mockSigIn)

    const ctx = {
      userRepository,
      cryptService,
      jwtService,
    }
    const input = {
      email: 'teste@mailinator.com',
      password: '123456'
    }
    const result = await SignIn(null, { input }, ctx)
    expect(result).toEqual(mockSigIn)
  })
})
