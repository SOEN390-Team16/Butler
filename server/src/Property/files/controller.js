require('dotenv').config()
const s3 = require('../../config/aws-config')
const {
  savePropertyFile,
  getFilesByPropertyId,
  deletePropertyFileByFileName,
  getSingleFileByFileId
} = require('./repository')

const getPropertyFiles = async (req, res) => {
  const property_id = req.params.property_id

  try {
    const files = await getFilesByPropertyId(property_id)
    res.status(200).send(files)
  } catch (error) {
    console.error('Error fetching property files:', error)
    res.status(500).send({
      error: 'Failed to retrieve property files',
      details: error.message
    })
  }
}

const postPropertyFiles = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  const property_id = req.params.property_id

  const uploadFileToS3 = (file) => {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }

    return s3.upload(uploadParams).promise()
  }

  try {
    const uploadPromises = req.files.map(file =>
      uploadFileToS3(file).then(uploadResult => {
        const url = uploadResult.Location
        const file_name = uploadResult.Key
        return savePropertyFile(property_id, file_name, url)
      })
    )

    const savedFilesResults = await Promise.all(uploadPromises)

    res.status(200).send(savedFilesResults)
  } catch (error) {
    console.error('Error uploading files or saving to database: ', error)
    res.status(500).send({
      error: 'Error uploading files to S3 or saving file data',
      details: error.message
    })
  }
}

const deletePropertyFiles = async (req, res) => {
  const property_id = req.params.property_id
  const file_id = req.params.file_id

  try {
    const fileDetails = await getSingleFileByFileId(file_id)
    if (!fileDetails || fileDetails.property_id.toString() !== property_id) {
      return res.status(404).send({ error: 'File not found under this property or mismatch in property ID' })
    }

    const deleteResult = await deletePropertyFileByFileName(file_id)
    res.status(200).send({
      message: 'File deleted successfully',
      details: deleteResult
    })
  } catch (error) {
    console.error('Error deleting property file:', error)
    res.status(500).send({
      error: 'Failed to delete property file',
      details: error.message
    })
  }
}

module.exports = {
  getPropertyFiles,
  postPropertyFiles,
  deletePropertyFiles
}
