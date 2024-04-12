const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config()

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder: 'butler',
        resource_type: 'auto'
      }, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })

    res.status(200).json({ url: result.url })
  } catch (error) {
    res.status(500).json({ error: 'Error uploading to Cloudinary', details: error.message })
  }
}

module.exports = { uploadImage }
