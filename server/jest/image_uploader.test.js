const { uploadImage } = require('../src/image/controller')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

jest.mock('cloudinary')
jest.mock('streamifier')

describe('uploadImage', () => {
  it('should respond with 200 and url when upload succeeds', async () => {
    const mockEnd = jest.fn()
    const mockPipe = jest.fn(() => ({ end: mockEnd }))
    streamifier.createReadStream = jest.fn(() => ({ pipe: mockPipe }))

    cloudinary.uploader.upload_stream = jest.fn((opts, callback) => {
      callback(null, { url: 'http://example.com/image.jpg' })
      return { end: mockEnd }
    })

    const req = {
      file: {
        buffer: Buffer.from('test file content')
      }
    }

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn()
    }

    await uploadImage(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ url: 'http://example.com/image.jpg' })
  })

  it('should respond with 500 when upload fails', async () => {
    const mockEnd = jest.fn()
    const mockPipe = jest.fn(() => ({ end: mockEnd }))
    streamifier.createReadStream = jest.fn(() => ({ pipe: mockPipe }))

    cloudinary.uploader.upload_stream = jest.fn((opts, callback) => {
      callback(new Error('Cloudinary error'), null)
      return { end: mockEnd }
    })

    const req = {
      file: {
        buffer: Buffer.from('test file content')
      }
    }

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn()
    }

    await uploadImage(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error uploading to Cloudinary',
      details: 'Cloudinary error'
    })
  })

  it('should respond with 400 when no file is provided', async () => {
    const req = { file: null }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn()
    }

    await uploadImage(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('No file uploaded.')
  })
})
