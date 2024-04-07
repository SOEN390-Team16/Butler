const { login } = require('../src/Login/controller')
const pool = require('../db')

describe('Login functionality', () => {
  it('should handle login for PublicUser with valid credentials', async () => {
    const req = { body: { email: 'testCey@email.com', password: '12345' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    await login(req, res)

    expect(res.send).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('should handle login for CMC with valid credentials', async () => {
    const req = { body: { email: 'test12@company.com', password: '1234' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    await login(req, res)

    expect(res.send).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('should handle invalid email or password for PublicUser', async () => {
    const req = { body: { email: 'invalid@example.com', password: 'invalidpassword' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    await login(req, res)
    expect(res.send).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
  })

  it('should handle invalid email or password for CMC', async () => {
    const req = { body: { email: 'invalidcmc@example.com', password: 'invalidpassword' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    await login(req, res)
    expect(res.send).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
  })

  it('should handle database connection error for PublicUser login', async () => {
    const req = { body: { email: 'testCey@email.com', password: '12345' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    jest.spyOn(pool, 'query').mockImplementationOnce(() => {
      throw new Error('Database connection error')
    })

    await login(req, res)

    expect(res.send).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should handle unexpected error during login', async () => {
    const req = { body: { email: 'testCey@email.com', password: '12345' } }
    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    }

    jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Unexpected error'))

    await login(req, res)

    expect(res.send).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
  })
})

afterAll(async () => {
  try {
    await pool.end()
  } catch (err) {
    console.error('Error closing the database connection:', err)
  }
})
