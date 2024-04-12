const {
  generateRegistrationKey
} = require('../src/RegistrationKey/controller')
const pool = require('../db')

jest.mock('../db')

describe('generateRegistrationKey', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should generate a new registration key and assign it to a user', async () => {
    const req = {
      params: { email: 'test@example.com', role: 'condo_owner' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }

    const mockKeyGenerator = jest.fn().mockReturnValue('randomKey')

    pool.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [] }) // checkIfRegistrationKeyAlreadyExists
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }) // checkIfPublicUserExists
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }) // generateRegistrationKey
      })

    const middleware = generateRegistrationKey(mockKeyGenerator)
    await middleware(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith('randomKey')
  })

  it('should return 404 if the registration key already exists', async () => {
    const req = {
      params: { email: 'test@example.com', role: 'condo_owner' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }

    const registration_key = 'randomKey'

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ registration_key }] }) // checkIfRegistrationKeyAlreadyExists
    })

    const middleware = generateRegistrationKey()
    await middleware(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('Registration Key Already Exists')
  })

  it('should return 404 if the public user is not found', async () => {
    const req = {
      params: { email: 'test@example.com', role: 'condo_owner' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }

    const mockKeyGenerator = jest.fn().mockReturnValue('randomKey')

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ exists: true }] }) // Simulates key existence
    })

    const middleware = generateRegistrationKey(mockKeyGenerator)
    await middleware(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('Registration Key Already Exists')
  })

  it('should handle internal server error when checking if registration key exists', async () => {
    const req = {
      params: { email: 'test@example.com', role: 'condo_owner' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Internal Server Error'), null) // checkIfRegistrationKeyAlreadyExists
    })

    const middleware = generateRegistrationKey()
    await middleware(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})
