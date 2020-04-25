const { ApolloError } = require('apollo-server')

const MergeUser = require('../mergeUser.resolver')


jest.mock('../../domain/model/user.model')
const userModel = require('../../domain/model/user.model')

const userRepository = {}

describe('Attempt to merge an user', () => {
  it('Should throw errors when model is not valid', async () => {
    userModel.hydrate.mockImplementation(() => {
      return {
        validateSync: () => {
          return {
            errors: [{ message: 'invalid field.' }],
          }
        },
      }
    })
    const ctx = {
      userModel,
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }
    const params = {
      input: {
        data: {},
        id: null,
      },
    }
    try {
      await MergeUser(null, params, ctx)
    } catch (err) {
      const expectedError = new ApolloError(JSON.stringify([{ message: 'invalid field.' }]), 'validation_errors')
      expect(err).toEqual(expectedError)
    }
  })

  it('Should update an user', async () => {
    const mockUser = {
      email: 'teste@mailinator.com',
      name: 'teste',
      deleted: null
    }

    userModel.hydrate.mockImplementation(() => {
      return {
        validateSync: () => false,
      }
    })

    userRepository.update = jest.fn().mockImplementation(() => ({ _id: '5e52ea89d572e200b83bec23', ...mockUser }))

    const ctx = {
      userModel,
      userRepository,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }

    const params = {
      input: {
        data: mockUser,
        id: '5e52ea89d572e200b83bec23',
      },
    }

    const user = await MergeUser(null, params, ctx)
    expect(user).toEqual({ _id: '5e52ea89d572e200b83bec23', ...mockUser })
  })

  it('Should create an user', async () => {
    const mockUser = {
      email: 'teste@mailinator.com',
      name: 'teste',
      password: '123456',
      deleted: null
    }

    userModel.hydrate.mockImplementation(() => {
      return {
        validateSync: () => false,
      }
    })

    const expectedUser = {
      _id: '5e57cd5831f6ae05d4cffaa7',
      ...mockUser,
    }

    userRepository.create = jest.fn().mockImplementation(() => expectedUser)

    const cryptService = {}

    cryptService.encrypt = jest.fn().mockImplementation(() => '5e57cd5831f6ae05d4cffaa71fdfafas#')

    const ctx = {
      userModel,
      userRepository,
      cryptService,
      authService: jest.fn().mockImplementation(() => true),
      user: { _id: '5e57cd5831f6ae05d4cffaa7' }
    }

    const params = {
      input: {
        data: mockUser,
        id: null,
      },
    }

    const user = await MergeUser(null, params, ctx)
    expect(user).toEqual(expectedUser)
  })

})