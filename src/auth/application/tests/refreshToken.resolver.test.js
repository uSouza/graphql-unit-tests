const { ApolloError } = require('apollo-server')

const RefreshToken = require('../refreshToken.resolver')

describe('Attempt to refreshToken', () => {
  it('Should throw an Apollo Error when refresh token is invalid', async () => {
    const expectedError = new ApolloError('Invalid refresh token', 'invalid_refresh_token')

    const jwtService = {}
    jwtService.verify = jest.fn().mockImplementation(() => { throw expectedError })

    const ctx = {
      jwtService,
    }
    try {
      const input = {
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NTU3MTIyNX0.OjciNjW100pILF9PshSWVf_smJlZBVa5YiEjzi_8YD0'
      }
      await RefreshToken(null, { input }, ctx)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }
  })
  it('Should return authentication tokens', async () => {
    const mockSigIn = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NDk3MDAyNX0.u1cANJHizNaHqwEhE9b4WD47ACXvNWussWZyxCCL9SM',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NTU3MTIyNX0.OjciNjW100pILF9PshSWVf_smJlZBVa5YiEjzi_8YD0'
    }

    const jwtService = {}
    jwtService.verify = jest.fn().mockImplementation(() => true)
    jwtService.generate = jest.fn().mockImplementation(() => mockSigIn)

    const ctx = {
      jwtService,
    }
    const input = {
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTUzMjk2ODFlMTU3ZDAyNjFmMWU4NzMiLCJpYXQiOjE1ODQ5NjY0MjUsImV4cCI6MTU4NTU3MTIyNX0.OjciNjW100pILF9PshSWVf_smJlZBVa5YiEjzi_8YD0'
    }
    const result = await RefreshToken(null, { input }, ctx)
    expect(result).toEqual(mockSigIn)
  })
})
